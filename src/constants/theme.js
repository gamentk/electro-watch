import { extendTheme } from 'native-base';

const theme = extendTheme({
    fontConfig: {
        Prompt: {
            100: {
                normal: 'Prompt-Light',
                italic: 'Prompt-LightItalic',
            },
            200: {
                normal: 'Prompt-Light',
                italic: 'Prompt-LightItalic',
            },
            300: {
                normal: 'Prompt-Light',
                italic: 'Prompt-LightItalic',
            },
            400: {
                normal: 'Prompt-Regular',
                italic: 'Prompt-Italic',
            },
            500: {
                normal: 'Prompt-Medium',
            },
            600: {
                normal: 'Prompt-Medium',
                italic: 'Prompt-MediumItalic',
            }
        },
    },
    fonts: {
        heading: 'Prompt',
        body: 'Prompt',
        mono: 'Prompt',
    },
});

export default theme;