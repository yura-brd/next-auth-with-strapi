export const saveErrorServer = (e: any) => {
  console.group('Server Error');
  console.warn(e);
  console.groupEnd();
}

export const showErrorFromLogin = (data: any) => {
  if (data && data.error) {
    console.warn(data);
    alert(data.error)
  }
}
export const showErrorFromError = (error: Error) => {
  if (error && error.message) {
    console.warn(error);
    alert(error.message)
  } else {
    alert('Unknown error')
  }
}