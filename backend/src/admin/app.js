export default {
    config: {
        locales: ['es'],
        tutorials: false,
        notifications: {
            releases: false
        },
        translations: {
            // https://github.com/strapi/strapi/blob/main/packages/core/admin/admin/src/translations/en.json
            en: {
                "Settings.profile.form.section.experience.interfaceLanguageHelp": 'Preference changes will apply only to you.',
                "app.components.LeftMenuLinkContainer.collectionTypes": "Forms",
                "app.components.LeftMenuLinkContainer.singleTypes": "General",
                "app.components.LeftMenu.navbrand.title": "Dashboard",
                "Auth.form.welcome.title": "Welcome!",
                "Auth.form.welcome.subtitle": "Log in to your account",
                // "app.components.HomePage.welcome.again": "",
                // "app.components.HomePage.welcomeBlock.content.again": "",
                // "app.components.HomePage.button.blog": "",

            },
            es: {
                "Settings.profile.form.section.experience.interfaceLanguageHelp": 'La selección cambiará el idioma de la interfaz solo para usted.',
                "app.components.LeftMenuLinkContainer.collectionTypes": "Formularios",
                "app.components.LeftMenuLinkContainer.singleTypes": "General",
                "app.components.LeftMenu.navbrand.title": "Panel de Control",
                "Auth.form.welcome.title": "Bienvenido!",
                "Auth.form.welcome.subtitle": "Inicie sesión en su cuenta",

            },
            ja: {
                "Auth.form.welcome.subtitle": "アカウントにログイン",
            },
        }
    },
    bootstrap() { },
}