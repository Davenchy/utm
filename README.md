# Universal Tab Manager - UTM

A simple, clean and powerful tab manager for your browser
![](/public/screenforreadme.jpg)

## Key Features
### <img src="public/icons/icon.png" width=20 height=20> Managing New Tabs
 **New Tab Page** - UTM replaces your new tab page with a beautiful and customizable page that helps you stay focused and productive:
- **Clock** - Get the current time in your local timezone to keep tracking your day.
- **Hadeeth of the Day** - Read a new random `Hadeeth Shareef` every time you open a new tab in Arabic and English with reference information in `Sahih Al-Bukhari`.
- **Quick Access Links** - Access your most visited websites and bookmarks with a single click.
- **Todo List** - Create a todo list and manage your tasks.
- **Wallpapers** - Get beautiful wallpapers and customize it as you like through settings.

- **And more...** watch this [demo video]() to explore the features of UTM till now.

## Technologies:

- [Firefox Browser Extension Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- HTML5 & CSS3 & Typescript
- [Reactjs](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [eslint](https://eslint.org/)
- [Hadeeth API](https://github.com/fawazahmed0/hadith-api)

## Installation

We will deploy the extension on the firefox addons store soon, but for now you can install it manually by following these steps:

### Development and Debugging

- First download this repository and install [npm](https://www.npmjs.com/) if you don't have it already

- Download dependencies and start the building server:

    ```bash
    npm install
    npm run dev
    ```

## Usage

Once you have installed the add-on, you can :
```bash
# start firefox with the extension installed
npm run browser
# OR open with developer tools for debugging
npm run browser:dev
# you can also set the path to the browser binary
npm run browser -- --firefox /path/to/firefox_bin
```

Or

you can go to `about:debugging#/runtime/this-firefox` and click on `Load Temporary Add-on...`

![img](/public/load_extention.png)

Then select the `manifest.json` file in the `dist` folder in the repository. After that you will find the extension in the extensions list during your current session.
![img](/public/loaded.png)


## Contributing

Your contribution is always welcome and appreciated. Go down to the Authors section and contact any of us to get started.

## License

[MIT License](https://choosealicense.com/licenses/mit/)

## Authors

- Fadi Assad: [Github](https://github.com/Davenchy) - [Linkedin](https://www.linkedin.com/in/fadi-asaad/
)
- Ammar Khaled: [Github](https://github.com/Ammar-Khaled) - [Linkedin](https://www.linkedin.com/in/ammar-khaled-895aa823b/)
- Ahmed Mamdouh: [Github](https://github.com/Ahmed-D007A) - [Linkedin](https://www.linkedin.com/in/ahmed-mamdouh-884805261/)