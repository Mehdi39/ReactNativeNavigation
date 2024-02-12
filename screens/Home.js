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
                    <Text>Loading afd</Text>
                </View>
            </SafeAreaView> :
            <SafeAreaView>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <FlatList
                        data={users}
                        numColumns={2}
                        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
                        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                        keyExtractor={(item, idx) => item.name + idx}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <TouchableOpacity
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        backgroundColor: "#6b7280",
                                        flex: 1,
                                        height: 200,
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>

    )
}