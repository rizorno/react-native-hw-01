import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Alert,
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
import { format } from "date-fns";
import { uploadCommentToServer } from "../../firebase/hooks";
import { getUser } from "../../redux/auth/authSelectors";
import { selectPostComments } from "../../redux/dashboard/postSelectors";
import {
  getPostAllCommentsThunk,
  getAllCommentsThunk,
} from "../../redux/dashboard/postOperations";
import { btnSend } from "../../images/iconsSVG";

const CommentsScreen = ({ route }) => {
  const { postId, pictureURL } = route.params;
  // eslint-disable-next-line no-unused-vars
  const { uid, name, avatar } = useSelector(getUser);
  const commentsList = useSelector(selectPostComments);
  const [comment, setComment] = useState("");
  const [margin, setMargin] = useState("90%");
  const [isFocused, setFocused] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAllCommentsThunk(postId));
  }, [dispatch, postId, commentsList.length]);

  let scrollRef;
  const onScrollToEnd = () => {
    if (commentsList.length !== 0) {
      scrollRef.scrollToEnd({ animated: false });
    } else {
      return;
    }
  };

  const onFooterMargin = () => {
    switch (isFocused === "focus" ? "focus" : commentsList.length) {
      case 0:
        return "90%";
      case 1:
        return "65%";
      case 2:
        return "40%";
      case 3:
        return "10%";
      default:
        return 0;
    }
  };

  const onSubmit = () => {
    if (!comment.trim()) {
      Alert.alert("Please enter a comment first!");
      setComment("");
      return;
    }

    uploadCommentToServer({ postId, uid, name, avatar, comment });

    dispatch(getPostAllCommentsThunk(postId));

    dispatch(getAllCommentsThunk());

    onScrollToEnd();

    setComment("");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={styles.flexList}
      >
        <View style={styles.flexList}>
          <FlatList
            ref={(listRef) => (scrollRef = listRef)}
            onContentSizeChange={() =>
              commentsList.length === 0
                ? null
                : scrollRef.scrollToEnd({ animated: false })
            }
            style={styles.flexList}
            data={commentsList}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Image source={{ uri: pictureURL }} style={styles.myPostImage} />
            }
            renderItem={({ item }) => {
              return (
                <View
                  style={
                    item.user_id == uid ? styles.postBoxOdd : styles.postBoxEven
                  }
                >
                  <View style={styles.userAvaBox}>
                    <Image
                      source={{ uri: item.user_ava }}
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
                      {format(item.date, "dd MMMM yyyy | H:mm")}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              <View style={styles.commentInputWrapper}>
                <TextInput
                  style={styles.inputDefault}
                  // style={styles.inputActive}
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
                  onFocus={() =>
                    commentsList.length === 0
                      ? setMargin(0)
                      : setFocused("focus")
                  }
                  onBlur={() =>
                    commentsList.length === 0
                      ? setMargin("90%")
                      : setFocused("") && setMargin("90%")
                  }
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
            }
            ListFooterComponentStyle={{
              marginTop: commentsList.length === 0 ? margin : onFooterMargin(),
            }}
          />
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
    maxWidth: 290,
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
    borderColor: "#FF6C00",
    borderRadius: 8,
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

CommentsScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CommentsScreen;
