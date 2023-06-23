import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";
import {
  uploadAva,
  uploadAvaToServer,
  uploadAvaToServerThunk,
  cleanAvaToServer,
  uploadLikeToServer,
  incrementLikeToServer,
  decrementLikeToServer,
} from "../../firebase/hooks";
import {
  getUserPostsThunk,
  getAllCommentsThunk,
  getAllLikesThunk,
} from "../../redux/dashboard/postOperations";
import { logOutThunk, getUserAvaThunk } from "../../redux/auth/authOperations";
import { getUser } from "../../redux/auth/authSelectors";
import {
  selectUserPosts,
  getComments,
  getLikes,
} from "../../redux/dashboard/postSelectors";
import bgAndroid from "../../images/bgAndroid.png";
import bgIOS from "../../images/bgIOS.png";
import {
  btnAdd,
  btnRemove,
  comment,
  commentColor,
  like,
  likeColor,
  local,
  logOut,
} from "../../images/iconsSVG";

const ProfileScreen = ({ navigation }) => {
  const { uid, name, avatar } = useSelector(getUser);
  const posts = useSelector(selectUserPosts);
  const comments = useSelector(getComments);
  const likes = useSelector(getLikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPostsThunk(uid));
    dispatch(getAllCommentsThunk());
    dispatch(getAllLikesThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.containerMain}>
      <ImageBackground
        source={Platform.OS == "ios" ? bgAndroid : bgIOS}
        resizeMode="cover"
        style={styles.bgImage}
      >
        <View
          style={posts.length === 0 ? styles.containerMargin : styles.container}
        >
          <View
            style={
              posts.length === 0
                ? styles.avaNoPostsImageBox
                : (avatar && styles.avaImageBox) || styles.avaNoImageBox
            }
          >
            {avatar && (
              <Image source={{ uri: avatar }} style={styles.avaImage} />
            )}
          </View>

          <TouchableOpacity
            style={avatar ? styles.avaRemoveBox : styles.avaAddBox}
            onPress={async () => {
              if (avatar === null || avatar === "") {
                const assets = await uploadAva();
                await uploadAvaToServer(assets[0].uri).then(async (url) => {
                  uploadAvaToServerThunk({ url, uid });
                });
                dispatch(getUserAvaThunk(uid));
              } else {
                cleanAvaToServer(uid);
                dispatch(getUserAvaThunk(uid));
              }
            }}
          >
            {avatar ? btnRemove : btnAdd}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logOutImg}
            onPress={() => dispatch(logOutThunk())}
          >
            <View>{logOut}</View>
          </TouchableOpacity>

          <Text style={styles.title}>{name}</Text>

          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const totalComments = comments.filter(
                (value) => value.postId === item.id
              ).length;

              const myComments = comments.filter(
                (value) => value.postId === item.id && value.user_id === uid
              ).length;

              const totalLikes = () => {
                const likesArr = likes.filter(
                  (value) => value.postId === item.id
                );
                const total = likesArr.reduce((previousValue, element) => {
                  return previousValue + element.likes;
                }, 0);
                return total;
              };

              const myLikes = likes.filter(
                (value) => value.postId === item.id && value.user_id === uid
              );

              return (
                <View style={styles.postBox}>
                  <View>
                    <Image
                      source={{ uri: item.picture }}
                      style={styles.myPostImage}
                    />
                  </View>
                  <Text style={styles.myPostTitle}>{item.title}</Text>
                  <View style={styles.touchWrapper}>
                    <TouchableOpacity
                      style={styles.infoBoxComment}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          pictureURL: item.picture,
                        })
                      }
                    >
                      <View>{myComments === 0 ? comment : commentColor}</View>
                      <Text
                        style={
                          myComments === 0
                            ? styles.commentText
                            : styles.commentTextColor
                        }
                      >
                        {totalComments}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.infoBoxLike}
                      onPress={async () => {
                        if (myLikes.length === 0) {
                          await uploadLikeToServer({ id: item.id, uid, name });
                        } else if (myLikes[0].likes === 0) {
                          await incrementLikeToServer({
                            id: item.id,
                            likeMy: myLikes[0].id,
                          });
                        } else {
                          await decrementLikeToServer({
                            id: item.id,
                            likeMy: myLikes[0].id,
                          });
                        }
                        dispatch(getAllLikesThunk());
                      }}
                    >
                      <View>
                        {myLikes.length === 0 || myLikes[0].likes === 0
                          ? like
                          : likeColor}
                      </View>
                      <Text
                        style={
                          myLikes.length === 0 || myLikes[0].likes === 0
                            ? styles.likeText
                            : styles.likeTextColor
                        }
                      >
                        {totalLikes()}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.infoBoxLocal}
                      onPress={() =>
                        navigation.navigate("Map", {
                          postCoords: item.coords,
                          postPlace: item.localisation,
                          postTitle: item.title,
                        })
                      }
                    >
                      <View style={styles.localIcon}>{local}</View>

                      <Text style={styles.localText}>{item.localisation}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 92,
    marginTop: "80%",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerMargin: {
    backgroundColor: "#ffffff",
    paddingTop: 92,
    paddingBottom: 300,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avaNoImageBox: {
    position: "absolute",
    top: "-14%",
    left: "37%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  avaNoPostsImageBox: {
    position: "absolute",
    top: "-87%",
    left: "37%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  avaImageBox: {
    position: "absolute",
    top: "-14%",
    left: "37%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  avaImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avaAddBox: {
    position: "absolute",
    top: 20,
    right: "35%",
    width: 25,
    height: 25,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
    borderRadius: "50%",
  },
  avaRemoveBox: {
    position: "absolute",
    top: 20,
    right: "35%",
    width: 25,
    height: 25,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#BDBDBD",
    borderRadius: "50%",
  },
  logOutImg: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    marginBottom: 33,
  },
  postBox: {
    marginBottom: 32,
  },
  myPostImage: {
    width: "99%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  myPostTitle: {
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
  },
  touchWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoBoxComment: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoBoxLocal: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  commentTextColor: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  infoBoxLike: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: "auto",
  },
  likeText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  likeTextColor: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  localIcon: {
    marginRight: 8,
  },
  localText: {
    maxWidth: 255,
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginRight: 10,
  },
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
