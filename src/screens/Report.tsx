import { Image, Text, useColorScheme, View, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text1 from '../components/text/Text1'
import Text3 from '../components/text/Text3'
import Screen from '../components/screen/Screen'
import { getReport } from '../services/db/Reports'
import BoxContainer from '../components/container/BoxContainer'

const Report = ({ route, navigation }: any) => {
    const { id } = route.params;
    const isDarkMode = useColorScheme() === 'dark';

    const [document, setDocument] = useState<any | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    useEffect(() => {
        const load = async () => {
            const data = await getReport(id);
            setDocument(data);
        };
        load();
    }, [id]);

    if (!document) return (<Screen><Text>document not found</Text></Screen>);

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Modal
                visible={!!selectedImage}
                transparent={true}
                animationType="fade"
            >
                <Pressable
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => setSelectedImage(null)}
                >
                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }}
                        />
                    )}
                </Pressable>
            </Modal>

            <Screen>
                <BoxContainer>
                    <Text1>Title: {document.title}</Text1>
                    <Text3>Date: {`${String(document.date.getDate()).padStart(2, '0')}/${String(document.date.getMonth() + 1).padStart(2, '0')}/${document.date.getFullYear()}`}</Text3>
                    <Text3>Name: {document.patiantName}</Text3>
                    {document.note?.trim() && <Text3>{document.note}</Text3>}
                </BoxContainer>

                {/* Images Section */}
                {document.images?.length > 0 && (
                    <BoxContainer>
                        <Text1>Images</Text1>
                        <View style={{ paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: "3.33%" }}>
                            {document.images.map((uri: string, index: number) => (
                                <Pressable key={index} onPress={() => setSelectedImage(uri)} style={{ width: '30.33%', }}>
                                    <Image
                                        source={{ uri }}
                                        style={{ width: "100%", aspectRatio: 1, borderRadius: 10 }}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </BoxContainer>
                )}

                {/* PDF Section */}
                {document.pdf?.length > 0 && (
                    <BoxContainer>
                        <Text1 >Documents</Text1>
                        {document.pdf.map((uri: string, index: number) => (
                            <Text3 key={index}>{uri.split('/').pop()}</Text3>
                        ))}
                    </BoxContainer>
                )}

            </Screen>
            <Pressable style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => { navigation.navigate('UpReport', { id }) }}>
                <BoxContainer>
                    <Text1>✏️ edit
                    </Text1>
                </BoxContainer>
            </Pressable>
        </View>
    );
};

export default Report;
