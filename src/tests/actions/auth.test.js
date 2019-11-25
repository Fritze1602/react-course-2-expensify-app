import {login, logout} from '../../actions/auth';


test('Should setup correct Login Action Object', () => {
    const uid = '123abc'
    const action= login(uid);
    expect(action).toEqual({
        uid,
        type: 'LOGIN'
    })
})


test('Should setup correct Logout Action Object', () => {
    const action= logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})