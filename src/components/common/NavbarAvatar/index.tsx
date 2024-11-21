import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const NavbarAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: theme.shadows[3],
    '&:hover': {
        backgroundColor: theme.palette.white.dark,
    },
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default NavbarAvatar;
