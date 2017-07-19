import React, { PropTypes, Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect }            from "react-redux";

import * as viewsActions      from "../../../actions/Routs";
import CatalogElement from '../../../components/Catalog/Catalog';


class Catalog extends Component {

    componentWillMount() {
        const { enterCatalog } = this.props;
        enterCatalog();
    }

    componentWillUnmount() {
        const { leaveCatalog } = this.props;
        leaveCatalog();
    }

    render() {
        return (
            <CatalogElement enterCatalogDetail={this.props.enterCatalogDetail} navigate={this.props.navigate}/>
        );
    }
}

Catalog.propTypes = {
    navigator:  PropTypes.object,
    navigate:   PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        currentView:  state.Routers
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            enterCatalog: viewsActions.enterCatalog,
            leaveCatalog: viewsActions.leaveCatalog,
            enterCatalogDetail: viewsActions.enterCatalogDetail,
        },
        dispatch
    );
};

export default connect( mapStateToProps, mapDispatchToProps )(Catalog);
