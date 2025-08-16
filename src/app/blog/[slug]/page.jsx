import DateFormat from '@/utils/dateFormat';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

export default function BlogPage({params}) {
    const { slug } = params;
    const tempTags = "Nasa, SapceX, ISRO, Space";
    return (
        <section>
            <div className='flex flex-col items-center justify-center'>
                <Image className='border rounded w-[600px]' src="/thumbnails/dreams.png" alt="Page Title" height={500} width={250}></Image>
                <div className='meta-of-blog flex flex-col justify-center items-center space-y-3'>
                    <div className='flex mt-4 gap-2'>
                        <Calendar className='inlne-block text-gray-500' />
                        <p className="text-gray-500">{DateFormat(new Date())}</p>
                    </div>
                    <div className='flex items-start mt-2 gap-2'>
                        <p>Category:</p>
                        <p className='badge text-xs border-gray-600 border w-fit px-2 py-1 rounded'>Space Exploration</p>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <p>Tags:</p>
                        {tempTags.split(',').map(tag => {
                            return <p className='badge hover:bg-slate-500 transition-all delay-50 text-xs border-gray-600 border w-fit px-2 py-1 rounded'>{tag}</p>
                        })}
                    </div>
                    <div className="content w-[75%]">
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora tenetur a neque illo repellendus reprehenderit aut laboriosam ipsam minus reiciendis officia, impedit suscipit quidem nihil ex eveniet aliquid placeat ducimus? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi incidunt fuga optio nulla, earum cum obcaecati nisi. Omnis cupiditate recusandae dolore itaque possimus, eaque architecto nulla saepe voluptates beatae natus, voluptatum expedita veritatis corrupti. Eum, sunt. Animi minima similique quaerat exercitationem eius ipsum quae, nulla consequatur reprehenderit fuga, cupiditate voluptatibus, quibusdam placeat laboriosam maiores obcaecati. Unde, modi similique, sunt quia expedita nobis pariatur officia dolor labore voluptate aspernatur, nostrum aliquam quos quam? Impedit sapiente ex odio consequatur saepe est velit itaque autem maiores ipsum animi id aut quae aliquid repudiandae aperiam quis, culpa placeat expedita commodi hic dolorum deleniti. Modi porro voluptates totam? Repudiandae dolorem dolorum ad minima excepturi fuga aperiam laboriosam facilis aliquam pariatur. Repellat nesciunt eum, dolores inventore cupiditate ad praesentium voluptatum asperiores ut iusto tempore officiis voluptatibus, dignissimos dolore labore illum voluptatem distinctio necessitatibus quibusdam at quod! Dolorum iusto beatae consequatur possimus voluptates exercitationem commodi necessitatibus, corporis tenetur animi itaque modi non laborum consectetur quae molestias cumque alias corrupti, temporibus culpa eius veniam laudantium aliquid impedit. Nobis animi quasi minima quae reiciendis inventore qui, excepturi harum magni dignissimos? Voluptas dicta quae quam labore unde ducimus. Voluptatem commodi dicta consectetur corporis rem perspiciatis reiciendis ducimus cumque ipsum praesentium.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}