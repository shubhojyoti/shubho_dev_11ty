require('dotenv').config();

module.exports = () => {
    const siteUrl = process.env.SITE_URL || 'http://localhost:8080';
    const siteName = process.env.SITE_NAME || '';
    const twitterProfile = process.env.TWITTER_PROFILE || '';
    const featuredImageSite = process.env.FEATURED_IMAGE_SITE || '';
    const profilePicMain = process.env.PROFILE_PIC_MAIN || '';
    return {
        siteUrl,
        siteName,
        twitterProfile,
        featuredImageSite,
        profilePicMain,
        currentYear: (new Date()).getFullYear()
    };
};
