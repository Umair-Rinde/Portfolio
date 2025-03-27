import Image from 'next/image';

export const TechStack = () => {
  const frontendTechs = [
    { name: 'JavaScript', icon: 'javascript.svg', skillLevel: 4 },
    { name: 'React', icon: 'react.svg', skillLevel: 4 },
    { name: 'Next.js', icon: 'next.svg', skillLevel: 2 },
    { name: 'TypeScript', icon: 'typescript-2.svg', skillLevel: 3 },
  ];

  const backendTechs = [
    { name: 'Python', icon: 'python.svg', skillLevel: 4 },
    { name: 'C++', icon: 'c++.svg', skillLevel: 3 },
    { name: 'NestJS', icon: 'nest.svg', skillLevel: 4 },
    { name: 'Django', icon: 'django.svg', skillLevel: 4 },
    { name: 'FastAPI', icon: 'fastapi.svg', skillLevel: 3 },
  ];

  const databasesTechs = [
    { name: 'PostgreSQL', icon: 'postgresql.svg', skillLevel: 4 },
    { name: 'MySQL', icon: 'mysql.svg', skillLevel: 3 },
    { name: 'SQLite', icon: 'sqllite.svg', skillLevel: 4 },
  ];

  const cloudTechs = [
    { name: 'Azure', icon: 'azure-2.svg', skillLevel: 3 },
    { name: 'Google Cloud Console', icon: 'google-cloud-2.svg', skillLevel: 3 },
  ];

  return (
    <section className="py-12 bg-gray-900 text-white">
      <h2 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 shadow-lg">
        Tech Stack
      </h2>

      {/* Frontend Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-poppins">Frontend</h3>
        <div className="flex flex-wrap gap-4 justify-center">
  {frontendTechs.map((tech, index) => (
    <div
      key={index}
      className="bg-gray-800 p-3 sm:p-6 rounded-xl shadow-lg w-[45%] sm:w-60 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
    >
      <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 relative bg-gray-600 rounded-full flex justify-center items-center shadow-md">
        <Image
          src={`/${tech.icon}`}
          alt={tech.name}
          width={48}
          height={48}
          priority
          className="object-contain"
        />
      </div>
      <h3 className="text-sm sm:text-xl font-medium mb-2">{tech.name}</h3>
      <div className="relative w-full h-2 bg-gray-600 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          style={{ width: `${(tech.skillLevel / 5) * 100}%` }}
        ></div>
      </div>
      <span className="block text-xs sm:text-sm mt-2">{`${tech.skillLevel} / 5`}</span>
    </div>
  ))}
</div>

      </div>

      {/* Backend Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-poppins">Backend</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {backendTechs.map((tech, index) => (
            <div
            key={index}
            className="bg-gray-800 p-3 sm:p-6 rounded-xl shadow-lg w-[45%] sm:w-60 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 relative bg-gray-600 rounded-full flex justify-center items-center shadow-md">
                <Image
                  src={`/${tech.icon}`} // Direct reference to icons from the public folder
                  alt={tech.name}
                  layout="intrinsic"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <h3 className="text-xl font-medium mb-3 font-roboto">{tech.name}</h3>
              <div className="relative w-full h-2 bg-gray-600 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${(tech.skillLevel / 5) * 100}%` }}
                ></div>
              </div>
              <span className="block text-sm mt-2 font-roboto">{`${tech.skillLevel} / 5`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Databases Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-poppins">Databases</h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {databasesTechs.map((tech, index) => (
            <div
      key={index}
      className="bg-gray-800 p-3 sm:p-6 rounded-xl shadow-lg w-[45%] sm:w-60 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
    >
      <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 relative bg-gray-600 rounded-full flex justify-center items-center shadow-md">
                <Image
                  src={`/${tech.icon}`} // Direct reference to icons from the public folder
                  alt={tech.name}
                  layout="intrinsic"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <h3 className="text-xl font-medium mb-3 font-roboto">{tech.name}</h3>
              <div className="relative w-full h-2 bg-gray-600 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${(tech.skillLevel / 5) * 100}%` }}
                ></div>
              </div>
              <span className="block text-sm mt-2 font-roboto">{`${tech.skillLevel} / 5`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-poppins">Cloud Services</h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {cloudTechs.map((tech, index) => (
            <div
            key={index}
            className="bg-gray-800 p-3 sm:p-6 rounded-xl shadow-lg w-[45%] sm:w-60 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 relative bg-gray-600 rounded-full flex justify-center items-center shadow-md">
                <Image
                  src={`/${tech.icon}`} // Direct reference to icons from the public folder
                  alt={tech.name}
                  layout="intrinsic"
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <h3 className="text-xl font-medium mb-3 font-roboto">{tech.name}</h3>
              <div className="relative w-full h-2 bg-gray-600 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${(tech.skillLevel / 5) * 100}%` }}
                ></div>
              </div>
              <span className="block text-sm mt-2 font-roboto">{`${tech.skillLevel} / 5`}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
