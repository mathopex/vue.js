import {date} from 'quasar'
import * as dateConsts from '../const/date'

const today = new Date()

const {formatDate} = date

/**
 * Récupère les chiffres d'une date format iso
 * @type {RegExp}
 */
const regIsoParse = /[^0-9]/

/**
 * Parse une date format iso vers un objet date JS
 * @param s
 */
export const parseIso = (s = '') => {
    if (!s) {
        return null
    }
    if (typeof s !== 'string') {
        // devLog('warn', 'parseIso with s : ', s)
        return new Date(s)
    }
    const [year = 0, month = 0, date = 0, hours = 0, minutes = 0, seconds = 0, ms = 0] = s.split(regIsoParse)
    let d1 = new Date(year, month - 1, date, hours, minutes, seconds, ms)

    if (d1.getTimezoneOffset() !== 0) {
        d1 = new Date(d1.getTime() + Math.abs(d1.getTimezoneOffset() * 60000));
    }

    return d1
}

export const dateFormatFr = (d) => formatDate(parseIso(d), dateConsts.DATE_FR)
export const dateFormatFrJourMoisLong = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_JOUR_MOIS_LONG)
export const dateFormatFrMoisAnneeLong = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_MONTH_YEAR_LONG)
export const dateFormatFrLong = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_LONG)

export const dateFormatFrJourCourt = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_JOUR_COURT)
export const dateFormatFrMoisCourt = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_MOIS_COURT)
export const dateFormatFrAnneeCourt = (d) => formatDate(parseIso(d), dateConsts.DATE_FR_ANNE_COURT)

export const dateTimeFormatFr = (d) => formatDate(parseIso(d), dateConsts.DATETIME_FR)
export const dateTimeFormatFrLong = (d) => formatDate(parseIso(d), dateConsts.DATETIME_FR_LONG)

export const dateTimeFormatIso = (d) => formatDate(parseIso(d), dateConsts.DATETIME_ISO)
export const dateFormatIso = (d) => formatDate(parseIso(d), dateConsts.DATE_ISO)
export const dateFormatIsoYearMonth = (d) => formatDate(parseIso(d), dateConsts.DATE_ISO_YEAR_MONTH)

export const dateFormatQuasar = (d) => formatDate(parseIso(d), dateConsts.DATE_QUASAR)

export const timeFormat = (d) => formatDate(parseIso(d), dateConsts.TIME)
export const timeFormatLong = (d) => formatDate(parseIso(d), dateConsts.TIME_LONG)
export const timeFullFormat = (d) => formatDate(parseIso(d), dateConsts.TIME_FULL)

export const minutesFormatHm = (minutes) => {
    return minutes > 0
        ? [Math.floor(minutes / 60), Math.ceil(minutes % 60)].map((v) => _.padStart(v, 2, '0')).join('h')
        : '0'
}

export const secondsDiff = (d1, d2) => d1 && d2 ? date.getDateDiff(d1, d2, 'seconds') : 0
export const minutesDiff = (d1, d2) => d1 && d2 ? date.getDateDiff(d1, d2, 'minutes') : 0
export const hoursDiff = (d1, d2) => date.getDateDiff(d1, d2, 'hours')
export const daysDiff = (d1, d2) => date.getDateDiff(d1, d2, 'days')
export const weeksDiff = (d1, d2) => inWeeks(d1, d2)
export const monthsDiff = (d1, d2) => date.getDateDiff(d1, d2, 'months')
export const yearsDiff = (d1, d2) => date.getDateDiff(d1, d2, 'years')
export const daysDiffToday = (d1) => date.getDateDiff(d1, today, 'days')
export const inWeeks = (d1, d2) => {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
}

export const secondesFormatHms = (secondes) => {
    if (!secondes) {
        return 0
    }
    const h = Math.floor(secondes / 3600)
    const m = Math.floor((secondes / 60) - h * 60)
    return [h, m, Math.floor(secondes % 60)].map((v) => _.padStart(Math.abs(v), 2, '0')).join(':')
}

/**
 * Retourne la date formatFr en deux parties [date, heure]
 * @param v
 * @returns {string[]}
 */
export const splitedDateFormatFr = (v) => v ? (dateTimeFormatFr(v) || '').split(' ') : ''


