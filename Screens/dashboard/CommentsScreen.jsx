import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { format, parseISO } from "date-fns";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getUser } from "../../redux/auth/authSelectors";
import avaUser from "../../images/avaUser.png";
import avaComment from "../../images/avaComment.png";
import { btnSend } from "../../images/iconsSVG";

const CommentsScreen = ({ route }) => {
  const { postId, pictureURL } = route.params;
  const { uid, name, avatarURL } = useSelector(getUser);
  const [isFocused, setIsFocused] = useState("");
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  const uploadCommentToServer = async () => {
    const date = new Date().toISOString();
    const dataComment = {
      date: date,
      user_id: uid,
      user_ava: avatarURL,
      user_text: comment,
    };

    try {
      const docRef = await addDoc(
        collection(db, "posts", postId, "comments"),
        dataComment
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllComments = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "posts", postId, "comments")
      );

      let commentsArr = [];
      await querySnapshot.forEach((doc) => {
        commentsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return commentsArr;
      });

      setCommentsList(commentsArr);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  onSubmit = () => {
    uploadCommentToServer();
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexList}>
        <FlatList
          data={commentsList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View>
              <Image source={{ uri: pictureURL }} style={styles.myPostImage} />
            </View>
          }
          renderItem={({ item }) => {
            return (
              <View
                style={
                  item.user_id == uid ? styles.postBoxOdd : styles.postBoxEven
                }
              >
                <View style={styles.userAvaBox}>
                  {/* <Image source={{uri: item.user_ava}} style={styles.userAva} /> */}
                  <Image
                    source={item.user_id === uid ? avaUser : avaComment}
                    style={styles.userAva}
                  />
                </View>
                <View
                  style={
                    item.user_id == uid
                      ? styles.commentWrapperOdd
                      : styles.commentWrapperEven
                  }
                >
                  <Text style={styles.commentText}>{item.user_text}</Text>
                  <Text
                    style={
                      item.user_id !== uid
                        ? styles.commentDateOdd
                        : styles.commentDateEven
                    }
                  >
                    {format(parseISO(item.date), "dd MMMM yyyy | H:mm")}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <View style={styles.commentInputWrapper}>
          <TextInput
            style={
              isFocused.password === "focus"
                ? styles.inputActive
                : styles.inputDefault
            }
            textAlign={"auto"}
            type="text"
            placeholder="Add comment"
            placeholderTextColor="#BDBDBD"
            maxLength={250}
            numberOfLines={1}
            autoComplete="off"
            keyboardType={
              Platform.OS === "ios" ? "default" : "visible-password"
            }
            value={comment}
            onChangeText={(value) => setComment(value)}
            onSubmitEditing={onSubmit}
          />

          <TouchableOpacity
            name="red"
            style={styles.commentBtnIcon}
            onPress={() => {
              onSubmit();
              Keyboard.dismiss();
            }}
            accessible={false}
          >
            <View>{btnSend}</View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  flexList: {
    flex: 1,
  },
  myPostImage: {
    width: "99%",
    height: 240,
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 32,
  },
  postBoxEven: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 24,
    maxWidth: 255,
  },
  postBoxOdd: {
    maxWidth: "99%",
    flexDirection: "row-reverse",
    columnGap: 10,
    marginTop: 24,
  },
  userAvaBox: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  userAva: {
    width: 28,
    height: 28,
  },
  commentWrapperEven: {
    width: 290,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  commentWrapperOdd: {
    maxWidth: 290,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 8,
    borderTopRightRadius: 0,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDateEven: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    lineHeight: 12,
    marginLeft: "auto",
  },
  commentDateOdd: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 10,
    lineHeight: 12,
    marginRight: "auto",
  },
  commentInputWrapper: {
    position: "relative",
    marginTop: 32,
  },
  inputActive: {
    height: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  inputDefault: {
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  commentBtnIcon: {
    position: "absolute",
    top: "10%",
    right: 8,
  },
});

export default CommentsScreen;
