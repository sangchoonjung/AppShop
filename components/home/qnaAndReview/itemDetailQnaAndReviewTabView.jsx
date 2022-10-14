import * as React from 'react';
import { useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import QnaAndReviewList from './qnaAndReviewList';


function ItemDetailQnaAndReviewTabView({ data }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        setRoutes([
            { key: 'Q&A', title: `Q&A(${data.QnA.length})` },
            { key: 'Review', title: `Review(${data.review.length})` },
        ]);
    }, [data.QnA.length, data.review.length]);

    const [routes, setRoutes] = React.useState([
        { key: 'Q&A', title: `Q&A(${data.QnA.length})` },
        { key: 'Review', title: `Review(${data.review.length})` },
    ], [data.QnA.length, data.review.length]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "Q&A":
                return <QnaAndReviewList item={data.QnA} type="qna" />
            case "Review":
                return <QnaAndReviewList item={data.review} type="review"/>
            default:
                break;
        }
    };

    return (
        <>
            <TabView
            style={styles.tabViewContainer}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                pagerStyle={styles.pagerSt}
            />
        </>
    );
}

const styles=StyleSheet.create({
    tabViewContainer:{
        backgroundColor:"white",
        color:"red"
    },
    pagerSt:{
        margin:10
    }
})
export default ItemDetailQnaAndReviewTabView;