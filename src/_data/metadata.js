require('dotenv').config();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const rssDateFormat = 'ddd, DD MMM YYYY HH:mm:ss'
const currDate = dayjs();
const currISOString = currDate.toISOString();
const currRssDate = `${currDate.utc().tz('GMT').format(rssDateFormat)} GMT`;

module.exports = () => {
    const siteUrl = process.env.SITE_URL || 'http://localhost:8080';
    const siteName = process.env.SITE_NAME || '';
    const twitterProfile = process.env.TWITTER_PROFILE || '';
    const featuredImageSite = process.env.FEATURED_IMAGE_SITE || '';
    const profilePicMain = process.env.PROFILE_PIC_MAIN || '';
    const email = process.env.EMAIL || '';
    const subTitle = process.env.SUBTITLE || '';
    return {
        siteUrl,
        siteName,
        twitterProfile,
        featuredImageSite,
        profilePicMain,
        email,
        subTitle,
        currentYear: (new Date()).getFullYear(),
        currentDate: currISOString,
        currRssDate
    };
};
