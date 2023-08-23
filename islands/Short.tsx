import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";
import { useState } from "preact/hooks";
import { ShortEntity } from "../utils/db.ts";

interface ShortProps {
  short: ShortEntity,
}

export default function Short({ short } : ShortProps) {
  const [isView, setView] = useState<boolean>(false);
  const onDelete = async () => {
    await fetch("/account/myshorts", { method: "DELETE", credentials: "same-origin", body: JSON.stringify(short) });
    window.location.reload();
  }
  return (
    <>
      <div class="flex items-center justify-between ">
        <div class="flex items-center space-x-4">
          <div>
            <p class="text-yellow-600 font-semibold">Short URL</p>
            <p class="text-gray-600">http://localhost:8000/s/{short.shortUrl}</p>
          </div>
          <button 
          onClick={() => navigator.clipboard.writeText(`http://localhost:8000/s/${short.shortUrl}`)}
          class="text-yellow-600 hover:text-yellow-800 focus:outline-none">
            <IconCopy class="w-6 h-6" />
          </button>
        </div>
        <div>
          <button onClick={() => setView(prevState => !prevState)} class="text-yellow-600 hover:underline m-3">
            View Original
          </button>
          |
          <button onClick={() => onDelete()} class="text-yellow-600 hover:underline m-3">
            Delete
          </button>
        </div>
      </div>

      {isView ?
        (
          <div class="mt-4 bg-white border border-gray-300 p-2 rounded-md whitespace-pre">
            {short.originalUrl}
          </div>
        ) : (<span></span>)
      }
      
    </>
  );
}