import { Alert, Image, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Text2 from '../components/text/Text2'
import Text4 from '../components/text/Text4'
import Screen from '../components/screen/Screen'
import DatePicker from 'react-native-date-picker'
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker'

const AddReports = ({ navigation }: any) => {
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
    return (
        <Screen>
            <View>
                <Text4>Patiant Name</Text4>
                <View>
                    <TextInput
                        placeholder='Enter patiant name'
                        value={document.patiantName}
                        onChangeText={(text) => { setDocument({ ...document, patiantName: text }) }}
                    />
                </View>
            </View>
            <View>
                <Text4>Document Title</Text4>
                <View>
                    <TextInput
                        placeholder='Enter medicine name'
                        value={document.title}
                        onChangeText={(text) => { setDocument({ ...document, title: text }) }}
                    />
                </View>
            </View>
            <View>
                <Text4>Personal Notes</Text4>
                <View>
                    <TextInput
                        placeholder='Enter motes'
                        value={document.note}
                        onChangeText={(text) => { setDocument({ ...document, note: text }) }}
                    />
                </View>
            </View>
            <View>
                <Pressable onPress={() => setOpenD(true)}>
                    <Text>select  date: {document.date.toLocaleDateString()}</Text>
                </Pressable>
                <DatePicker
                    modal
                    open={openD}
                    date={document.date}
                    mode='date'
                    onConfirm={(selectedTime) => { setOpenD(false); setDocument({ ...document, date: selectedTime }) }}
                />
            </View>
            <View>
                <View>
                    <Pressable onPress={openCamera}>
                        <Text2>camera</Text2>
                    </Pressable>
                    <Pressable onPress={pickImages}>
                        <Text2>browse</Text2>
                    </Pressable>

                </View>
                <View>
                    {document.images.map((img, index) => (
                        <Pressable key={index} onPress={() => deleteImage(index)}>
                            <Image

                                source={{ uri: img.uri }}
                                style={{ height: 100, width: 100 }}
                            />
                        </Pressable>
                    ))}
                </View>
                <View>
                    <Pressable>
                        <Text2>save</Text2>
                    </Pressable>
                </View>
            </View>
        </Screen>
    )
}

export default AddReports

const styles = StyleSheet.create({})