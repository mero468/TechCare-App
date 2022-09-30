import React, { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Error_screen from './screens/auth_screens/error_screen';
import FlashMessage from "react-native-flash-message";
import { Store } from './statemanagement/store';
import { LogBox } from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
LogBox.ignoreLogs(['Warning: ...', 'WARN', '`flexWrap:', 'Require cycle']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const App = () => {

    return (
        <ReduxProvider store ={Store}>

                <AppRoutes />
                <FlashMessage position="top" />
        </ReduxProvider>
    );
};


export default App;