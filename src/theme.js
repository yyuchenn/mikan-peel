import { createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from "@material-ui/core/colors/deepOrange";

const mainThem = createMuiTheme({
    palette: {
        primary: orange,
        secondary: deepOrange,
    },
});

export const responsiveMainThem = responsiveFontSizes(mainThem);