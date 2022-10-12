import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView } from 'react-native-tab-view';
import List from '../../home/list';

export default function TabViewExample({ pendingList,completeList }) {
    const layout = useWindowDimensions();
    // console.log(completeList)
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'pending', title: `대기중(${pendingList.length})` },
        { key: 'complete', title: `구매완료(${completeList.length})` },
    ], [pendingList]);


    const renderScene = ({ route }) => {
        switch (route.key) {
            case "pending":
                return <List item={pendingList} />
            case "complete": 
            return <Text>임시</Text>
            default:
                break;
        }

    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}