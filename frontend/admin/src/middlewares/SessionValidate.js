export const SessionValidate = () => {
    const lastSession = parseInt(sessionStorage.getItem('SESSION_TIME'))
    const currentSession = new Date().getTime()
    const SESSION_TIME = 10000 * 60 // 10 SEGUNDOS
    if ((currentSession - lastSession) > SESSION_TIME) {
        sessionStorage.removeItem('daiswadod')
        window.location.reload()
    } else sessionStorage.setItem('SESSION_TIME', currentSession)
}