import { StyleSheet } from 'react-native';
import { screenWidth, screenHeight } from '../variables/appVariables';

export const globalStyles = StyleSheet.create({
    whiteBackgroundContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    blueBackgroundContainer: {
        flex: 1,
        backgroundColor: '#65A3FF'
    },
    container: {
        flex: 1
    },
    aligncenterContainer: {
        flex: 1,
        alignItems: 'center',
    },
    //底部按钮容器
    bottomSingleButtonContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: '14.67%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomDoubleButtonContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: '21.33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //按钮样式
    yellowLargeButton: {
        borderRadius: 10,
        backgroundColor: '#FFCC34',
        width: 0.84 * screenWidth,
        height: 50,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    darkGreyLargeButton: {
        borderRadius: 10,
        backgroundColor: '#434343',
        width: 0.84 * screenWidth,
        height: 50,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightGreyLargeButton: {
        borderRadius: 10,
        backgroundColor: '#A0A0A0',
        width: 0.84 * screenWidth,
        height: 50,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteLargeButton: {
        borderRadius: 10,
        backgroundColor: '#ffffff',
        width: 0.84 * screenWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blueLargeButton: {
        borderRadius: 10,
        backgroundColor: '#65A3FF',
        width: 0.84 * screenWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    yellowMediumButton: {
        backgroundColor: '#FFCC34',
        borderRadius: 25,
        width: 235,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteMediumButton: {
        backgroundColor: '#ffffff',
        width: 0.42 * screenWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redMediumButton: {
        backgroundColor: '#FF2020',
        borderRadius: 25,
        width: 235,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //按钮文字
    blackButtonText: {
        color: '#1C1D27',
        fontWeight: 'bold',
        fontSize: 14,
    },
    whiteButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    blueButtonText: {
        color: '#65A3FF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    //弹窗样式
    overlaybottomSingleButtonContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayDoubleSingleButtonContainer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 38
    }

    // bottomButtonContainer: {
    //     position: 'absolute',
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     marginHorizontal: 30,
    //     marginBottom: 30,
    // },
    // yellowLargeButton: {
    //     borderRadius: 10,
    //     backgroundColor: '#FFCC34',
    //     width: 315,
    //     height: 50,
    //     shadowColor: '#000000',
    //     shadowOffset: { width: 0, height: 3 },
    //     shadowOpacity: 0.16,
    //     shadowRadius: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // blackButtonText: {
    //     color: '#1C1D27',
    //     fontWeight: 'bold',
    //     fontSize: 14,
    // },
    // smallButton: {
    //     borderRadius: 50,
    //     marginLeft: '30%',
    //     marginRight: '30%',
    //     paddingVertical: 20,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#65A3FF',
    // },
    // mediumButton: {
    //     borderRadius: 50,
    //     marginLeft: '25%',
    //     marginRight: '25%',
    //     paddingVertical: 20,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#65A3FF',
    // },
    // largeButton: {
    //     borderRadius: 50,
    //     marginHorizontal: '5%',
    //     marginBottom: '5%',
    //     paddingVertical: 20,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#65A3FF',
    // },
    // largeWhiteButton: {
    //     borderRadius: 50,
    //     borderColor: '#65A3FF',
    //     borderWidth: 1,
    //     marginHorizontal: '5%',
    //     marginBottom: '1%',
    //     paddingVertical: 20,
    //     paddingHorizontal: 10,
    //     backgroundColor: '#ffffff',
    // },
    // bottomButtonContainer: {
    //     position: 'absolute',
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     marginBottom: 20,
    // },
    // buttonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     textTransform: 'uppercase',
    //     fontSize: 16,
    //     textAlign: 'center',
    // },
    // whiteButtonText: {
    //     color: '#65A3FF',
    //     fontWeight: 'bold',
    //     textTransform: 'uppercase',
    //     fontSize: 16,
    //     textAlign: 'center',
    // },
    // screenTitleText: {
    //     marginVertical: 40,
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: '#333',
    // },
    // titleText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#333',
    // },
    // textFieldInput: {
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     padding: 10,
    //     fontSize: 18,
    //     borderRadius: 6,
    // },
    // paragraph: {
    //     marginVertical: 8,
    //     lineHeight: 20,
    // },
    // container: {
    //     flex: 1,
    //     padding: 20,
    // },
    // input: {
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     padding: 10,
    //     fontSize: 18,
    //     borderRadius: 6,
    // },
    // errorText: {
    //     color: 'crimson',
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //     marginTop: 6,
    //     textAlign: 'center',
    // },
});

