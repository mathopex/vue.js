import { slugify, toCapitalize } from 'src/common/utils.service';
import { dateTimeFormatFrLong, daysDiff, hoursDiff, minutesDiff, monthsDiff, secondsDiff, weeksDiff, yearsDiff } from 'src/common/date.service';


export const filters = {
    slugify: function (value) {
        return slugify(value);
    },
    getPlainTextDiffDate: function (value) {
        const dString = value; //will also get (Y-m-d H:i:s)
        const d1 = new Date();
        let d2 = new Date(dString);

        if (d2.getTimezoneOffset() !== 0) {
            d2 = new Date(d2.getTime() + Math.abs(d2.getTimezoneOffset() * 60000));
        }

        let timeLaps = secondsDiff(d1, d2);
        let dateOutput = '';

        if (timeLaps < 60) {
            dateOutput = 'à l\'instant';
        } else {
            timeLaps = minutesDiff(d1, d2);

            if (timeLaps < 60) {
                dateOutput = timeLaps + ' minutes';
            } else {
                timeLaps = hoursDiff(d1, d2);

                if (timeLaps < 24) {
                    dateOutput = timeLaps + ' heure(s)';
                } else {
                    timeLaps = daysDiff(d1, d2);
                    if (timeLaps < 7) {
                        dateOutput = timeLaps + ' jour(s)';
                    } else {
                        timeLaps = weeksDiff(d2, d1);
                        if (timeLaps < 4) {
                            dateOutput = timeLaps + ' semaine(s)';
                        } else {
                            timeLaps = monthsDiff(d2, d1);
                            if (timeLaps < 12) {
                                dateOutput = timeLaps + ' moi(s)';
                            } else {
                                timeLaps = yearsDiff(d2, d1);
                                dateOutput = timeLaps + ' année(s)';
                            }
                        }
                    }
                }
            }
        }

        return dateOutput;
    },
    getPlainTextDate: function (value) {
        const dString = value; //will also get (Y-m-d H:i:s)
        let d1 = new Date(dString);

        return dateTimeFormatFrLong(dString);
    },
    toCapitalize: function (string) {
        return toCapitalize(string);
    }
};


