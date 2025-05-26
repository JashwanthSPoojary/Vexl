import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export default function RepositoryImportFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories..."
          className="pl-9 text-sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      <Select value={sortBy} onValueChange={setSortBy} >
        <SelectTrigger className="w-40 cursor-pointer" >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated">Recently Updated</SelectItem>
          <SelectItem value="stars">Stars</SelectItem>
          <SelectItem value="forks">Forks</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
