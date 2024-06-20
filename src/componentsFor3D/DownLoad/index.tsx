import { useEffect } from 'react';
import useControlStore from 'provider/Zustand';
import { useThree } from '@react-three/fiber';
import JSZip from 'jszip';
import { Layers } from 'three';

const layers = new Layers();
layers.enable(0);
layers.disable(1);
const colorLayer = new Layers();
colorLayer.enable(0);
colorLayer.enable(1);
colorLayer.enable(100);
const layer1 = new Layers();
layer1.enable(0);
layer1.enable(2);
layer1.enable(100);
const layer2 = new Layers();
layer2.enable(0);
layer2.enable(3);
layer2.enable(100);
const layer3 = new Layers();
layer3.enable(0);
layer3.enable(4);
layer3.enable(100);
const DownLoad = () => {
  const selectedModel = useControlStore((state) => state.selectedModel);
  const processFlag = useControlStore((state) => state.processFlag);
  const hsv = useControlStore((state) => state.hsv);
  const setDownload = useControlStore((state) => state.setDownload);
  const setProcessFlag = useControlStore((state) => state.setProcessFlag);
  const items = useControlStore((state) => state.items);

  const { gl, scene, camera } = useThree();
  const getFileName = (url: string) => {
    const segments = url.split('/');
    return segments[segments.length - 1];
  };
  useEffect(() => {
    if (processFlag) {
      const fCam = camera.clone();
      const bCam = camera.clone();
      const fMaskCam = camera.clone();
      const bMaskCam = camera.clone();
      fCam.layers = colorLayer;
      fMaskCam.layers = layers;
      bCam.layers = colorLayer;
      bMaskCam.layers = layers;
      fCam.position.set(0, 2, 0);
      bCam.position.set(0, 2, 100);
      fMaskCam.position.set(0, 2, 0);
      bMaskCam.position.set(0, 2, 100);
      fMaskCam.zoom = parseInt(selectedModel[5]);
      bMaskCam.zoom = parseInt(selectedModel[5]);
      bCam.zoom = parseInt(selectedModel[5]);
      fCam.zoom = parseInt(selectedModel[5]);
      bCam.updateProjectionMatrix();
      fCam.updateProjectionMatrix();
      fMaskCam.updateProjectionMatrix();
      bMaskCam.updateProjectionMatrix();
      const zip = new JSZip();
      let urls = items.map((item) => item.content);
      urls = [
        `/assets/${selectedModel[0]}/ofront.png`,
        `/assets/${selectedModel[0]}/oback.png`,
        ...urls,
      ];
      const saveFrontScreenshot = async (index: number) => {
        return new Promise((resolve) => {
          gl.domElement.toBlob(
            (blob: any) => {
              resolve(
                zip.file(
                  selectedModel[1] === 'front'
                    ? 'modelFrontTexture' + index + '.png'
                    : 'modelBackTexture' + index + '.png',
                  blob
                )
              );
            },
            'image/png',
            1
          );
        });
      };
      const saveFrontMaskScreenshot = async () => {
        return new Promise((resolve) => {
          gl.domElement.toBlob(
            (blob: any) => {
              resolve(
                zip.file(
                  selectedModel[1] === 'front'
                    ? 'modelFrontMaskTexture.png'
                    : 'modelBackMaksTexture.png',
                  blob
                )
              );
            },
            'image/png',
            1
          );
        });
      };
      const saveBackScreenshot = async (index: number) => {
        return new Promise((resolve) => {
          gl.domElement.toBlob(
            (blob: any) => {
              resolve(
                zip.file(
                  selectedModel[1] === 'front'
                    ? 'modelBackTexture' + index + '.png'
                    : 'modelFrontTexture' + index + '.png',
                  blob
                )
              );
            },
            'image/png',
            1
          );
        });
      };
      const saveBackMaskScreenshot = async () => {
        return new Promise((resolve) => {
          gl.domElement.toBlob(
            (blob: any) => {
              resolve(
                zip.file(
                  selectedModel[1] === 'front'
                    ? 'modelBackMaskTexture.png'
                    : 'modelFrontMaskTexture.png',
                  blob
                )
              );
            },
            'image/png',
            1
          );
        });
      };
      // Fetch each URL and store data in an array of objects
      const fetchAndStoreData = async (urls: Array<string>) => {
        const filePromises = urls.map(async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const name = getFileName(url);
          return { blob, name };
        });

        return Promise.all(filePromises);
      };
      // Download all the files as a single ZIP file
      const downloadFiles = async () => {
        gl.render(scene, fCam);
        saveFrontScreenshot(0)
          .then(() => {
            gl.render(scene, bCam);
            return saveBackScreenshot(0); // return the promise from here
          })
          .then(() => {
            if (hsv.length > 5) {
              fCam.layers = layer1;
              fCam.updateProjectionMatrix();
              gl.render(scene, fCam);
              return saveFrontScreenshot(1); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (hsv.length > 5) {
              bCam.layers = layer1;
              bCam.updateProjectionMatrix();
              gl.render(scene, bCam);
              return saveBackScreenshot(1); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (hsv.length > 6) {
              fCam.layers = layer2;
              fCam.updateProjectionMatrix();
              gl.render(scene, fCam);
              return saveFrontScreenshot(2); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (hsv.length > 6) {
              bCam.layers = layer2;
              bCam.updateProjectionMatrix();
              gl.render(scene, bCam);
              return saveBackScreenshot(2); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (hsv.length > 7) {
              fCam.layers = layer3;
              fCam.updateProjectionMatrix();
              gl.render(scene, fCam);
              return saveFrontScreenshot(3); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (hsv.length > 7) {
              bCam.layers = layer3;
              bCam.updateProjectionMatrix();
              gl.render(scene, bCam);
              return saveBackScreenshot(3); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (items.findIndex((item) => item.frontSide === 'front') > -1) {
              gl.setSize(4000, 4000, true);
              gl.render(scene, fMaskCam);
              return saveFrontMaskScreenshot(); // return the promise from here
            } else return null;
          })
          .then(() => {
            if (items.findIndex((item) => item.frontSide === 'back') > -1) {
              gl.setSize(4000, 4000, true);
              gl.render(scene, bMaskCam);
              return saveBackMaskScreenshot(); // return the promise from here
            } else return null;
          })
          .then(() => {
            return fetchAndStoreData(urls); // handle the next async operation
          })
          .then((files) => {
            const imgFolder = zip.folder('assets');
            files.forEach((file, index) => {
              let filename = `${index}.svg`;
              if (file.blob.type === 'image/png') filename = `${index}.png`;
              else if (file.blob.type === 'image/jpeg')
                filename = `${index}.jpg`;
              imgFolder?.file(filename, file.blob, { base64: true });
            });
            return zip.generateAsync({ type: 'blob' }); // return the content of the zip file with generated assets folder
          })
          .then((content) => {
            // const url = window.URL.createObjectURL(content);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = `${selectedModel[0]}.zip`;
            // a.click();
            // window.URL.revokeObjectURL(url);

            // ///////////////
            // console.log(JSON.stringify(items));
            const formData = new FormData();
            const blob = new Blob([content], { type: 'application/zip' });
            formData.append('product', selectedModel[0]);
            formData.append('colors', JSON.stringify(hsv));
            formData.append('designerdata', JSON.stringify(items));
            formData.append('zip_file', blob, `${selectedModel[0]}.zip`);
            fetch(process.env.REACT_APP_POST_API as string, {
              method: 'POST',
              headers: {
                Authorization:
                  'Basic ' +
                  btoa(
                    process.env.REACT_APP_USERNAME +
                      ':' +
                      process.env.REACT_APP_PASSWORD
                  ),
              },
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                setDownload(false);
                setProcessFlag(false);
                window.location.href = data.newURL;
                console.log(data);
              })
              .catch((err) => {
                setDownload(false);
                setProcessFlag(false);
                console.log(err);
              });
          });
      };
      downloadFiles();
      // Promise.all([
      //   saveFrontScreenshot(),
      //   saveBackScreenshot(),
      //   fetchAndStoreData(urls),
      // ])
      //   .then(([frontFile, backFile, files]) => {
      //     return downloadFiles(files);
      //   })
      //   .catch((err) => console.error(err));
    }
  }, [processFlag]);
  return null;
};

export default DownLoad;
