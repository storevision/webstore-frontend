import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export interface NavbarAvatarProps {
    radius?: number | false;
}

const NavbarAvatar = styled(Avatar, {
    shouldForwardProp: propName => propName !== 'radius',
})<NavbarAvatarProps>(({ theme, radius }) => ({
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
}));

export default NavbarAvatar;
