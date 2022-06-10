import {View} from 'react-native';
import { ButtonGroup } from "@rneui/themed";
import styles from "./MainMenu.scss";

export const MainMenu = (): JSX.Element => {
    return (<>
        <View style={styles.container}>
        <ButtonGroup
            vertical
            textStyle={{ color: "black" }}
            containerStyle={{ backgroundColor: "#6FC", width: "50%" }}
            buttons={['PLAY', 'DASHBOARD', 'LOGIN', 'LOGOUT', 'SIGN-UP', 'SETTINGS']}
        />
        </View>
    </>);
};
