import Planning from "../models/planning.model.js";

const normalizeDayIndex = (dayIndex) => {
  const parsed = Number(dayIndex);

  if (!Number.isInteger(parsed)) {
    return null;
  }

  return parsed === 0 ? 7 : parsed;
};

const getTodayIndex = () => normalizeDayIndex(new Date().getDay());

const getWeekStart = (date = new Date()) => {
  const todayIndex = normalizeDayIndex(date.getDay());
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  if (todayIndex >= 6) {
    start.setDate(start.getDate() + (8 - todayIndex));
    return start;
  }

  start.setDate(start.getDate() - (todayIndex - 1));
  return start;
};

const getWeekRange = () => {
  const start = getWeekStart();
  const end = new Date(start);
  end.setDate(start.getDate() + 4);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const parseDayIndex = (value) => {
  if (value === undefined || value === null || value === "") {
    return { error: "Jour manquant" };
  }

  const normalized = normalizeDayIndex(value);

  if (!normalized || normalized > 5) {
    return { error: "Jour invalide" };
  }

  return { value: normalized };
};

const buildDateTime = (dayIndex, timeValue, weekStart) => {
  const [hoursRaw, minutesRaw = "0"] = String(timeValue).split(":");
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);

  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
    throw new Error("Invalid time value");
  }

  const date = new Date(weekStart);
  date.setDate(weekStart.getDate() + (dayIndex - 1));
  date.setHours(hours, minutes, 0, 0);

  return date;
};

const validateDateRange = (startDate, endDate) => {
  if (startDate < new Date()) {
    return "Creneau deja passe";
  }

  if (endDate <= startDate) {
    return "L'heure de fin doit etre apres le debut";
  }

  return null;
};

const getValidatedDates = (dayIndex, startHour, endHour) => {
  const dayCheck = parseDayIndex(dayIndex);

  if (dayCheck.error) {
    return { error: dayCheck.error };
  }

  const todayIndex = getTodayIndex();

  if (todayIndex && dayCheck.value < todayIndex) {
    return { error: "Jour deja passe" };
  }

  const weekStart = getWeekStart();
  const startDate = buildDateTime(dayCheck.value, startHour, weekStart);
  const endDate = buildDateTime(dayCheck.value, endHour, weekStart);
  const rangeError = validateDateRange(startDate, endDate);

  if (rangeError) {
    return { error: rangeError };
  }

  return { startDate, endDate };
};

export const createPlanning = async (req, res) => {
  const { meaning, StartHour, EndHour, dayIndex } = req.body;

  const usersurname = req.user.surname;
  const username = req.user.name;
  const userId = req.user.id;

  try {
    const { error, startDate, endDate } = getValidatedDates(
      dayIndex,
      StartHour,
      EndHour,
    );

    if (error) {
      return res.status(400).json({ error });
    }

    const planning = await Planning.create({
      reunion_title: meaning,
      organizer: usersurname + " " + username,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    });

    return res.status(201).json(planning);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getPlanning = async (req, res) => {
  try {
    const { start, end } = getWeekRange();
    const planning = await Planning.findBetween(start, end);
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updatePlanning = async (req, res) => {
  const { meaning, StartHour, EndHour, dayIndex } = req.body;

  const usersurname = req.user.surname;
  const username = req.user.name;
  const userId = req.user.id;

  try {
    const { error, startDate, endDate } = getValidatedDates(
      dayIndex,
      StartHour,
      EndHour,
    );

    if (error) {
      return res.status(400).json({ error });
    }

    const planning = await Planning.update(req.params.id, {
      reunion_title: meaning,
      organizer: usersurname+" "+username,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    });

    return res.status(200).json(planning);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deletePlanning = async (req, res) => {
  try {
    const planning = await Planning.delete(req.params.id);
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
