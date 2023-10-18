import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'



export default class BranchList extends React.Component {
    render() {
        const { img, title, onPress } = this.props
        return (
            <TouchableOpacity 
                activeOpacity={0.85}
                onPress={onPress}
                style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    backgroundColor: '#f2f2f2',
                    padding: 20,
                    marginHorizontal: 20,
                    borderRadius: 20,
                    alignItems: 'center',
                    marginTop: 10,
                    width: 375,
                    elevation: 5,
                    shadowColor: '#1b1b1b'
                }}
            >
                <View>
                    <Text style={{
                        color: "#1b1b1b",
                        fontFamily: "Prompt-Bold",
                        fontSize: 13,
                        paddingHorizontal: 5,
                        width: 250,
                    }}>{title}</Text>

                </View>
                <Image
                    source={img}
                    style={{ width: 60, height: 60 }}
                />



            </TouchableOpacity>
        )
    }
}

