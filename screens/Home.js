import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function Home() {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
    }, [])

    console.log(loading)
    return (
        loading ?
            <SafeAreaView>
                <View>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView> :
            <View style={{ flex: 1, marginTop: 20 }}>
                <FlatList
                    data={users}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
                    contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                    keyExtractor={(item, idx) => idx}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            // <Text>Hello</Text>
                            <TouchableOpacity
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    backgroundColor: "gray",
                                    flex: 1,
                                    height: 200,
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ color: "white"}}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    ListHeaderComponentStyle={{ marginVertical: 10 }}
                    ListHeaderComponent={() => (
                        <View>
                            <FlatList 
                                horizontal={true}
                                style={{ paddingVertical: 5 }}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
                                data={users}
                                keyExtractor={(user, index) => index}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            width: 300,
                                            height: 200,
                                            backgroundColor: "#fca5a5",
                                            borderRadius: 20,
                                        }}    
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                />
            </View>

    )
}