import { Alert, Image, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import Text2 from '../components/text/Text2'
import Text4 from '../components/text/Text4'
import Screen from '../components/screen/Screen'
import ContentContainer from '../components/container/ContentContainer'
import DatePicker from 'react-native-date-picker'
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Icons from '../components/Icons'
import { addReport } from '../services/db/Reports'

const AddReports = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [document, setDocument] = useState({
        patiantName: "",
        title: "",
        note: "",
        date: new Date(),
        images: [] as Asset[],
        pdf: [] as any[]
    });
    const [openD, setOpenD] = useState(false)

    const requestCameraPermission = async () => {
        if (Platform.OS !== 'android') return true;
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    // ✅ Camera
    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Camera permission denied');
            return;
        }

        const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            saveToPhotos: false,
        });

        const asset = result.assets?.[0];
        if (!asset) return;

        setDocument(prev => ({
            ...prev,
            images: [...prev.images, asset] // append new image
        }));
    };

    // ✅ Gallery (no permission needed)
    const pickImages = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0, // 0 = unlimited, 1 = single
            quality: 1,
        });

        if (result.didCancel || result.errorCode) return;

        const assets = result.assets || [];

        setDocument(prev => ({
            ...prev,
            images: [...prev.images, ...assets]
        }));
    };

    //delete image by index
    const deleteImage = (index: number) => {
        setDocument(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    //save
    const handleSave = async () => {
        try {
            // If title is empty, use first PDF file name
            let finalTitle = document.title;

            if (!finalTitle && document.pdf.length > 0) {
                const firstPdf = document.pdf[0];
                finalTitle = firstPdf.fileName || "Untitled Report";
            }

            await addReport({
                ...document,
                title: finalTitle,
                images: document.images.map(img => img.uri || ""),
                pdf: document.pdf.map(file => file.uri || "")
            });
            Alert.alert('report saved!');
            navigation.navigate('Tab', { screen: 'reports', })
        } catch (err) {
            console.error(err);
            Alert.alert('Error saving report.');
        }
    };

    return (
        <Screen>
            <ContentContainer>
                <Text4>Patiant Name</Text4>
                <View>
                    <TextInput
                        style={{ color: isDarkMode ? "#fff" : "#000" }}
                        placeholder='Enter patiant name'
                        value={document.patiantName}
                        onChangeText={(text) => { setDocument({ ...document, patiantName: text }) }}
                    />
                </View>
            </ContentContainer>
            <ContentContainer>
                <Text4> Title</Text4>
                <View>
                    <TextInput
                        style={{ color: isDarkMode ? "#fff" : "#000" }}
                        placeholder='Enter Tilte'
                        value={document.title}
                        onChangeText={(text) => { setDocument({ ...document, title: text }) }}
                    />
                </View>
            </ContentContainer>
            <ContentContainer>
                <Text4>Personal Notes</Text4>
                <View>
                    <TextInput
                        style={{ color: isDarkMode ? "#fff" : "#000" }}
                        placeholder='Enter notes'
                        value={document.note}
                        onChangeText={(text) => { setDocument({ ...document, note: text }) }}
                    />
                </View>
            </ContentContainer>
            <ContentContainer>
                <Pressable onPress={() => setOpenD(true)}>
                    <Text2>select  date: {document.date.toLocaleDateString()}</Text2>
                </Pressable>
                <DatePicker
                    modal
                    open={openD}
                    date={document.date}
                    mode='date'
                    onConfirm={(selectedTime) => { setOpenD(false); setDocument({ ...document, date: selectedTime }) }}
                />
            </ContentContainer>
            <ContentContainer>
                <Text2>Images</Text2>
                <View style={{ flexDirection: "row", gap: "4%" }}>
                    <View >
                        <Pressable onPress={openCamera}>
                            <ContentContainer>
                                <Icons icon='camera' />
                            </ContentContainer>
                        </Pressable>
                    </View>
                    <View >
                        <Pressable onPress={pickImages}>
                            <ContentContainer>
                                <Icons icon='reports' />
                            </ContentContainer>
                        </Pressable>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", paddingTop: 10 }} >
                    {document.images.map((img, index) => (
                        <Pressable key={index} onPress={() => deleteImage(index)}>
                            <Image

                                source={{ uri: img.uri }}
                                style={{ width: 80, aspectRatio: 1, borderRadius: 10, }}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                </View>
            </ContentContainer>
            <Pressable onPress={() => handleSave()}>
                <ContentContainer>
                    <Text2>save</Text2>
                </ContentContainer>
            </Pressable>
        </Screen >
    )
}

export default AddReports

const styles = StyleSheet.create({})