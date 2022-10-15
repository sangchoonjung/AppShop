import * as React from 'react';
import { useWindowDimensions, Text } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import List from '../../home/list';

export default function TabViewExample({ pendingList, completeList,refreshOneProduct }) {
    const layout = useWindowDimensions();
    // console.log(completeList)
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        setRoutes([
            { key: 'pending', title: `pended(${pendingList.length})` },
            { key: 'complete', title: `complete(${completeList.length})` },
        ])
        //length 업데이트가 안 돼서 수동으로 했습니다.
    }, [pendingList.length, completeList.length])

  

    const [routes, setRoutes] = React.useState([
        { key: 'pending', title: `pended(${pendingList.length})` },
        { key: 'complete', title: `complete(${completeList.length})` },
    ], [pendingList.length, completeList.length]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "pending":
                // route.title = `pended(${pendingList.length})`
                return <List item={pendingList} />
            case "complete":
                // route.title = `complete(${completeList.length})`
                return <List item={completeList} refreshOneProduct={refreshOneProduct} />
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
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#006699'}} indicatorStyle={{backgroundColor:"#A5D8FA"}}/>}
        />
    );
}