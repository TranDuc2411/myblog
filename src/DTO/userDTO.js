class UserDTO {
    constructor(displayname, nickname, age, email, favoriteJob, socialNetwork, avatar, aboutme) {
        this.displayname = displayname || null;
        this.nickname = nickname || null;
        this.age = age || null;
        this.email = email || null;
        this.favoriteJob = favoriteJob || [];
        this.social_network = socialNetwork || [];
        this.avatar = avatar || null;
        this.aboutme = aboutme || null;
    }
}
module.exports = UserDTO;