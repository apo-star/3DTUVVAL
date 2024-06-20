import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai';
import { useFreeCount } from 'provider/Zustand/freeCount';
import { useState } from 'react';
import { Img } from 'react-image';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import useControlStore from 'provider/Zustand';

export default function ImageGenerator() {
  const setDesignUrl = useControlStore((state) => state.setDesignUrl);

  const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

  const [imageURL, setImageURL] = useState('');
  const [imageId, setImageId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    prompt: '',
    sizeKey: '',
  });
  const { prompt, sizeKey } = data;

  const freeCount = useFreeCount((state) => state.count);
  const decreamentFreeCount = useFreeCount((state) => state.decrementFreeCount);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateImage = async (e: any) => {
    e.preventDefault();
    if (freeCount > 0) {
      e.preventDefault();
      if (sizeKey === '') {
        return alert('Select a size pls!');
      }
      setLoading(true);
      try {
        const response = await openai.createImage({
          prompt: prompt,
          n: 1,
          size: CreateImageRequestSizeEnum[
            sizeKey as keyof typeof CreateImageRequestSizeEnum
          ],
        });
        const url: any = response.data.data[0].url;
        setImageId(response.data.created.toString());
        decreamentFreeCount();
        setImageURL(url);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error('You cannot generate image anymore!');
    }
  };

  const selectAiImage = () => {
    const imageData = {
      name: `${imageId + '.jpg'}`,
      path: `${imageURL}`,
    };

    setDesignUrl({
      name: imageData.name,
      path: imageData.path,
    });
  };

  return (
    <div
      className='absolute h-90 hidden overflow-y-auto md:flex-row flex-col justify-center items-center top-10 left-1/2 -translate-x-1/2 bg-white border-4 border-zinc-800'
      id='aiModal'
    >
      <h1 className='text-4xl h-20 text-center bg-zinc-800 text-white bg-zinc-800 py-4'>
        Image Generator
      </h1>
      <form className='my-6 mx-4' onSubmit={generateImage}>
        <input
          type='text'
          name='prompt'
          value={prompt}
          onChange={handleChange}
          className='w-full text-2xl rounded p-1 mb-5 border border-black'
        />
        <select
          name='sizeKey'
          defaultValue='Select Image Size'
          className='my-5 w-full text-2xl p-1 rounded border border-zinc-800'
          onChange={handleChange}
        >
          <option defaultValue='' value='Select Image Size' disabled>
            Select Image Size
          </option>
          <option value='_256x256'>Small</option>
          <option value='_512x512'>Medium</option>
          <option value='_1024x1024'>Large</option>
        </select>
        <div className='flex'>
          <button
            className='mt-5 w-full text-2xl p-1 mr-2 text-zinc-800 rounded border border-zinc-800'
            type='submit'
          >
            Generator
          </button>
          <button
            className='mt-5 ml-2 w-full text-2xl p-1 text-zinc-800 rounded border border-zinc-800'
            onClick={selectAiImage}
            type='button'
          >
            Use AI Image
          </button>
        </div>
        <div className='image--container min-h-4 flex md:flex-row flex-col justify-center items-center'>
          {loading ? (
            <MoonLoader />
          ) : (
            <Img id={imageId} src={imageURL} alt='' loader={<MoonLoader />} />
          )}
        </div>
      </form>
    </div>
  );
}
