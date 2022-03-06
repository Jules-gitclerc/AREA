export const drawWith = 240

export const DEFAULT_PAGE = 1
export const GENERAL_DASHBOARD = 1
export const GENERAL_PROFILE = 2
export const SERVICE_SETTINGS = 3
export const API_WEATHER = 4
export const TWITTER = 5
export const SPOTIFY = 6
export const DISCORD = 7
export const TWITCH = 8
export const REDDIT = 9
export const TELEGRAM = 10
export const CHAT = 12
export const CLASH_ROYALE = 11

export const theme_default = {
    palette: {
        secondary: {
            main: 'rgb(16, 185, 129)'
        },
        primary: {
            main: 'rgb(11, 15, 25)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(16, 185, 129)',
                button: 'rgb(209, 213, 219)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(11, 15, 25)',
                titleList: 'rgb(107, 114, 128)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_lakers = {
    palette: {
        secondary: {
            main: 'rgb(199, 185, 64)'
        },
        primary: {
            main: 'rgb(122, 70, 163)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(199, 185, 64)',
                button: 'rgb(209, 213, 219)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(11, 15, 25)',
                titleList: 'rgb(107, 114, 128)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_france = {
    palette: {
        secondary: {
            main: 'rgb(237, 40, 57)'
        },
        primary: {
            main: 'rgb(0, 36, 150)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(237, 40, 57)',
                button: 'rgb(230, 233, 242)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(31, 49, 107)',
                titleList: 'rgb(230, 233, 242)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_military = {
    palette: {
        secondary: {
            main: 'rgb(190, 159, 128)'
        },
        primary: {
            main: 'rgb(72, 117, 56)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(190, 159, 128)',
                button: 'rgb(230, 233, 242)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(66, 92, 68)',
                titleList: 'rgb(230, 233, 242)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_egirl = {
    palette: {
        secondary: {
            main: 'rgb(118, 11, 161)'
        },
        primary: {
            main: 'rgb(252, 86, 244)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(74, 0, 137)',
                button: 'rgb(255, 255, 255)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(252, 86, 244)',
                titleList: 'rgb(255, 255, 255)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_sunshine = {
    palette: {
        secondary: {
            main: 'rgb(224, 220, 213)'
        },
        primary: {
            main: 'rgb(217, 137, 0)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(224, 220, 213)',
                button: 'rgb(11, 15, 25)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(217, 137, 0)',
                titleList: 'rgb(11, 15, 25)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_sidekick = {
    palette: {
        secondary: {
            main: 'rgb(30, 30, 30)'
        },
        primary: {
            main: 'rgb(112, 82, 142)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(196, 142, 251)',
                button: 'rgb(226, 226, 226)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(30, 30, 30)',
                titleList: 'rgb(226, 226, 226)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const theme_christmas = {
    palette: {
        secondary: {
            main: 'rgb(240, 29, 29)'
        },
        primary: {
            main: 'rgb(57, 179, 110)'
        },
        dashboard: {
            drawer: {
                buttonSelected: 'rgb(240, 29, 29)',
                button: 'rgb(226, 226, 226)',
                hover: 'rgba(255, 255, 255, 0.08)',
                background: 'rgb(36, 84, 50)',
                titleList: 'rgb(226, 226, 226)'
            },
            appBar: {
                hover: 'rgba(89, 84, 84, 0.16)',
            }
        }
    }
}

export const dataTheme = [
    {
        id: 1,
        name: 'Default',
        color: theme_default,
    },
    {
        id: 2,
        name: 'Lakers',
        color: theme_lakers,
    },
    {
        id: 3,
        name: 'France',
        color: theme_france,
    },
    {
        id: 4,
        name: 'Military',
        color: theme_military,
    },
    {
        id: 5,
        name: 'Pink',
        color: theme_egirl,
    },
    {
        id: 6,
        name: 'Sunshine',
        color: theme_sunshine,
    },
    {
        id: 7,
        name: 'Sidekick',
        color: theme_sidekick,
    },
    {
        id: 8,
        name: 'Christmas',
        color: theme_christmas,
    }
]