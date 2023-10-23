import React from "react";
import * as Font from "expo-font";

const LoadFonts = async () => {
    await Font.loadAsync({
        'strong': require('../../assets/fonts/Strong.ttf')
    });

    return <></>
};

export default LoadFonts;