export function testLocalStorageAvaliability() {
  try {
    if (!window.localStorage) throw new Error

    const testKey = "__storage-test__"
    
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey);
  }
  catch(e) {
    return {status: "error"}
  }

  return {status: "success"}
}