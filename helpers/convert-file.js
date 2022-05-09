export const convertProfile = (ev) => {
    let result;
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        result = e.target.result;
    }
    return result;
}