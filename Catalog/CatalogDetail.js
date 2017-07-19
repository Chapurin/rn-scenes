import React, { PropTypes, Component }  from "react";
import { StyleSheet, View, Text }       from "react-native";
import { bindActionCreators }           from "redux";
import { connect }                      from "react-redux";

import * as viewsActions        from "../../../actions/Routs";
import CatalogItemDetail        from "../..//../components/Catalog/ItemDetail";


class CatalogDetail extends Component {

    componentWillMount() {
        const { enterCatalogDetail } = this.props;
        enterCatalogDetail();
    }

    componentWillUnmount() {
        const { leaveCatalogDetail } = this.props;
        leaveCatalogDetail();
    }

    render() {
        return (
            <CatalogItemDetail params={{id: this.props.currentView.catalogDetailId}}/>
        );
    }
}

CatalogDetail.propTypes = {
    ref:  PropTypes.string,
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
            enterCatalogDetail: viewsActions.enterCatalogDetail,
            leaveCatalogDetail: viewsActions.leaveCatalogDetail
        },
        dispatch
    );
};

export default connect( mapStateToProps, mapDispatchToProps )(CatalogDetail);