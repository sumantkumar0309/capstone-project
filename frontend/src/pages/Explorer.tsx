import { useState, useEffect } from "react";
import { MapPin, ChevronRight, Search as SearchIcon, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { fetchStates, fetchDistricts, fetchSubDistricts, fetchVillages } from "@/lib/api";

type LocationItem = {
  id: string;
  name: string;
  code: number;
};

export default function Explorer() {
  // Remote Data Lists
  const [statesList, setStatesList] = useState<LocationItem[]>([]);
  const [districtsList, setDistrictsList] = useState<LocationItem[]>([]);
  const [subDistrictsList, setSubDistrictsList] = useState<LocationItem[]>([]);
  const [villagesList, setVillagesList] = useState<LocationItem[]>([]);

  // Selected Selection
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Initial Load - Setup States dropdown
  useEffect(() => {
    setIsLoading(true);
    fetchStates()
      .then(setStatesList)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleStateChange = (id: string) => {
    setSelectedState(id);
    setSelectedDistrict(null);
    setSelectedSubDistrict(null);
    
    setDistrictsList([]);
    setSubDistrictsList([]);
    setVillagesList([]);
    
    if (id) {
      setIsLoading(true);
      fetchDistricts(id)
        .then(setDistrictsList)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const handleDistrictChange = (id: string) => {
    setSelectedDistrict(id);
    setSelectedSubDistrict(null);
    
    setSubDistrictsList([]);
    setVillagesList([]);
    
    if (id) {
      setIsLoading(true);
      fetchSubDistricts(id)
        .then(setSubDistrictsList)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const handleSubDistrictChange = (id: string) => {
    setSelectedSubDistrict(id);
    setVillagesList([]);
    
    if (id) {
      setIsLoading(true);
      fetchVillages(id)
        .then(setVillagesList)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const filteredVillages = villagesList.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 mt-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Data Explorer
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Browse Indian Geography
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Navigate through states, districts, sub-districts to find specific villages
            and their MDDS codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">State</label>
            <Select onValueChange={handleStateChange} value={selectedState || undefined}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {statesList && statesList.map((state) => (
                  <SelectItem key={state.id} value={state.id.toString()}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">District</label>
            <Select 
              onValueChange={handleDistrictChange} 
              value={selectedDistrict || undefined}
              disabled={!selectedState || districtsList.length === 0}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districtsList && districtsList.map((district) => (
                  <SelectItem key={district.id} value={district.id.toString()}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Sub-District</label>
            <Select 
              onValueChange={handleSubDistrictChange} 
              value={selectedSubDistrict || undefined}
              disabled={!selectedDistrict || subDistrictsList.length === 0}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Sub-District" />
              </SelectTrigger>
              <SelectContent>
                {subDistrictsList && subDistrictsList.map((subD) => (
                  <SelectItem key={subD.id} value={subD.id.toString()}>
                    {subD.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Search Village</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Type village name..."
                className="pl-9 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={!selectedSubDistrict || villagesList.length === 0}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {selectedSubDistrict ? 'Villages in selected Sub-District' : 'Select locations to view villages'}
            </h2>
            {selectedSubDistrict && (
              <Badge variant="secondary">
                {filteredVillages.length} Results
              </Badge>
            )}
          </div>

          {!selectedSubDistrict ? (
            <div className="bg-white border text-center py-16 rounded-xl border-dashed">
              <MapPin className="mx-auto h-12 w-12 text-slate-300 md:text-slate-400" />
              <h3 className="mt-4 text-lg font-medium text-slate-900">No area selected</h3>
              <p className="mt-1 text-slate-500">
                Please select State, District, and Sub-District to see villages.
              </p>
            </div>
          ) : filteredVillages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVillages.map((village) => (
                <div key={village.id} className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{village.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          MDDS Code: {village.code}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border text-center py-16 rounded-xl border-dashed">
              <Users className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-medium text-slate-900">No villages found</h3>
              <p className="mt-1 text-slate-500">
                {search ? `No village matching "${search}" found in this area.` : "No villages exist in this level."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
