import React, { PropTypes, Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Platform } from "react-native";
import { H1, H2, H3 } from "native-base";
import { bindActionCreators } from "redux";
import { connect }            from "react-redux";

import * as viewsActions      from "../../../actions/Routs";
import Styles from "../../../components/Styles/Styles";
import Images from "../../../assets/Images";

class Home extends Component {

    constructor(){
        super();
        this.state = { styles: new Styles() };
    }

    componentWillMount() {
        const { enterHome } = this.props;
        enterHome();
    }

    componentWillUnmount() {
        const { leaveHome } = this.props;
        leaveHome();
    }

    render () {

        return (
            <ScrollView>
                <View onLayout={(evt)=>{this.setState({styles: new Styles(evt.nativeEvent.layout.width)});}}>

                    { this.renderSectionIntroBlock() }

                    { this.renderSectionAboutProject() }

                    { this.renderSectionFrontendTechBlock() }

                    { this.renderSectionBackendTechBlock() }

                </View>
            </ScrollView>
        );
    }

    renderSectionIntroBlock = () => {
        let styles = this.state.styles;
        return (
            <View style={styles.introScreen}>
                <View style={styles.introWrapper}>
                    <View style={styles.introContent}>
                        <View style={styles.textBox}>
                            <Text style={{ ...styles.textCommon, ...styles.textTitle, ...styles.textColorWhite }}>Рады представить Вам React Factory</Text>
                            <Text style={{ ...styles.textCommon, ...styles.textContent, ...styles.textColorWhite }}>
                                Платформу по созданию масштабируемых приложений, основанных на сверхбыстром фронтенде и уникальном модульном бекенде.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.introBlockOverlay} />
                <Image style={styles.introBlockImage} source={Images.home.introBg} />
            </View>
        );
    };

    renderSectionAboutProject = () => {
        let styles = this.state.styles;
        return(
            <View style={styles.introScreen}>
                <View style={styles.introWrapper}>
                    <View style={styles.introContent}>
                        <View style={styles.textBox}>
                            <Text style={{ ...styles.textCommon, ...styles.textTitle, ...styles.textColorWhite }}>Что это?</Text>
                            <Text style={{ ...styles.textCommon, ...styles.textContent, ...styles.textColorWhite }}>
                                Данное приложение лишь демонстрация малой толики того, на что способна наша платформа.
                                Мы собрали лучшее от бекенда и фронтенда чтобы реализовать качественный продукт.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.introBlockOverlay} />
                <Image style={styles.introBlockImage} source={Images.home.aboutBg} />
            </View>
        );
    };

    renderSectionFrontendTechBlock = () => {
        let styles = this.state.styles;
        return(
            <View style={styles.introScreen}>
                <View style={{ ...styles.introWrapper, ...styles.techFront }}>
                    <View style={{ ...styles.introContent, ...styles.techContent }}>
                        <View style={styles.textBox}>
                            <Text style={{ ...styles.textCommon, ...styles.textTitle, ...styles.techTitle }}>Frontend</Text>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.react} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>React</Text>
                                <Text style={{...styles.textCommon}}>Компонентный фронтенд, оптимальный во всех своих проявлениях</Text>
                            </View>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.redux} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>Redux</Text>
                                <Text style={{...styles.textCommon}}>Кристальная чистота и прозрачность архитектуры</Text>
                            </View>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.js} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>Thunk</Text>
                                <Text style={{...styles.textCommon}}>Простота и эффективность сайдэффектов</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    };

    renderSectionBackendTechBlock = () => {
        let styles = this.state.styles;
        return(
            <View style={styles.introScreen}>
                <View style={{ ...styles.introWrapper, ...styles.techBackend }}>
                    <View style={{ ...styles.introContent, ...styles.techContent }}>
                        <View style={styles.textBox}>
                            <Text style={{ ...styles.textCommon, ...styles.textTitle, ...styles.techTitle }}>Backend</Text>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.node} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>Backend</Text>
                                <Text style={{...styles.textCommon}}>Масштабируемость и мощность, покоряющая вершины</Text>
                            </View>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.expressjs} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>Express.js</Text>
                                <Text style={{...styles.textCommon}}>Простота и модульность бекенда</Text>
                            </View>
                        </View>

                        <View style={styles.techItem}>
                            <Image source={Images.logos.mongodb} style={styles.techBlockItemImg}/>
                            <View style={styles.techItemWrapperText}>
                                <Text style={{...styles.textCommon, ...styles.techBlockItemTitle}}>MongoDB</Text>
                                <Text style={{...styles.textCommon}}>Гармония и многообразие данных</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    };


}

Home.propTypes = {
    navigator:  PropTypes.object,
    navigate:   PropTypes.func
};


const mapStateToProps = (state) => {
    return {
        currentView:  state.views
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            enterHome: viewsActions.enterHome,
            leaveHome: viewsActions.leaveHome
        },
        dispatch
    );
};

export default connect( mapStateToProps, mapDispatchToProps )(Home);