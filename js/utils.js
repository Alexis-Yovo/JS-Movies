export function waitFor(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000); 
    });
}