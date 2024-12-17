import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export interface NavbarAvatarProps {
    radius?: number | false;
    padding?: number;
}

const NavbarAvatar = styled(Avatar, {
    shouldForwardProp: propName =>
        propName !== 'radius' && propName !== 'padding',
})<NavbarAvatarProps>(({ theme, radius, padding }) => ({
    backgroundColor: theme.palette.white.main,
    borderRadius:
        radius === false ? undefined : theme.shape.borderRadius * (radius ?? 3),
    boxShadow: theme.shadows[3],
    '&:hover': {
        backgroundColor: theme.palette.white.dark,
    },
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
    padding: theme.spacing(padding ?? 0.5),
}));

export default NavbarAvatar;
