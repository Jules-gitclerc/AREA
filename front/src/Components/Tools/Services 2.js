import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import { ReactComponent as SpotifyIcon } from '../../assets/spotify.svg'
import { ReactComponent as ClashRoyaleIcon } from '../../assets/clash-royale.svg'
import { ReactComponent as RedditIcon } from '../../assets/reddit.svg'
import { ReactComponent as GreyDiscordIcon } from '../../assets/discord-grey.svg'
import { ReactComponent as GreyTwitchIcon } from '../../assets/twitch-grey.svg'
import { ReactComponent as GreySpotifyIcon } from '../../assets/spotify-grey.svg'
import { ReactComponent as GreyClashRoyaleIcon } from '../../assets/clash-royale-grey.svg'
import { ReactComponent as GreyRedditIcon } from '../../assets/reddit-grey.svg'
import SvgIcon from '@mui/icons-material/Twitter';
import { TWITTER, SPOTIFY, DISCORD, TWITCH, REDDIT, TELEGRAM, CLASH_ROYALE } from "../Main/config";

export function PropFromId(id) {
    switch (id) {
        case (1):
            return ({icon: <TwitterIcon/>, pageId: TWITTER, color: '#1C9CEB', name: 'Twitter', path: 'Twitter'});
        case (2):
            return ({icon: <SvgIcon component={SpotifyIcon} inheritViewBox/>, pageId: SPOTIFY, color: '#CC0063', name: 'Spotify', path: 'Spotify'});
        case (3):
            return ({icon: <SvgIcon component={DiscordIcon} inheritViewBox/>, pageId: DISCORD, color: '#5562EA', name: 'Discord', path: 'Discord'});
        case (4):
            return ({icon: <SvgIcon component={TwitchIcon} inheritViewBox/>, pageId: TWITCH, color: '#8C45F7', name: 'Twitch', path: 'Twitch'});
        case (5):
            return ({icon: <SvgIcon component={RedditIcon} inheritViewBox/>, pageId: REDDIT, color: '#FF5700', name: 'Reddit', path: 'Reddit'});
        case (6):
            return ({icon: <TelegramIcon/>, pageId: TELEGRAM, color: '#26A2E1', name: 'Telegram', path: 'Telegram'});
        case (7):
            return ({icon: <SvgIcon component={ClashRoyaleIcon} inheritViewBox/>, pageId: CLASH_ROYALE, color: '#488bf4', name: 'Clash Royale', path: 'ClashRoyale'});
        default:
            return ({icon: <TwitterIcon/>, pageId: TWITTER, color: '#1C9CEB', name: 'Twitter', path: 'Twitter'});
    }
}

export function iconFromName(name) {
    switch (name) {
        case ('Twitter'):
            return (<TwitterIcon sx={{fontSize: 50, color: 'white'}}/>);
        case ('Spotify'):
            return (<SvgIcon component={SpotifyIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
        case ('Telegram'):
            return (<TelegramIcon sx={{fontSize: 50, color: 'white'}}/>);
        case ('Twitch'):
            return (<SvgIcon component={TwitchIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
        case ('Discord'):
            return (<SvgIcon component={DiscordIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
        case ('Reddit'):
            return (<SvgIcon component={RedditIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
        case ('Clash Royale'):
            return (<SvgIcon component={ClashRoyaleIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
        default:
            return (<TwitterIcon sx={{fontSize: 50, color: 'white'}}/>);
    }
}

export function greyIconFromId(name) {
    switch (name) {
        case (1):
            return (<TwitterIcon/>);
        case (2):
            return (<SvgIcon component={GreySpotifyIcon} inheritViewBox/>);
        case (6):
            return (<TelegramIcon/>);
        case (4):
            return (<SvgIcon component={GreyTwitchIcon} inheritViewBox/>);
        case (3):
            return (<SvgIcon component={GreyDiscordIcon} inheritViewBox/>);
        case (5):
            return (<SvgIcon component={GreyRedditIcon} inheritViewBox/>);
        case (7):
                return (<SvgIcon component={GreyClashRoyaleIcon} inheritViewBox/>);
        default:
            return (<TwitterIcon/>);
    }
}