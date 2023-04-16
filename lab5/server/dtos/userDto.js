export class UserDto{
    userName;
    userId;

    constructor(model) {
        this.userName = model.userName;
        this.userId = model._id;
    }
}