import dayjs from "dayjs";

type DateFormat = "A h:mm";

export const formatDate = (timeStamp: string, dateFormat: DateFormat): string => {
    return dayjs(timeStamp).format(dateFormat);
};
