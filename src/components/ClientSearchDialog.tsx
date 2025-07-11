
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, Building2, Check } from "lucide-react";

interface Client {
  id: string;
  name: string;
  wabas: Array<{
    id: string;
    name: string;
    lines: Array<{
      id: string;
      phone: string;
      name: string;
    }>;
  }>;
}

interface ClientSearchDialogProps {
  clients: Client[];
  selectedClient: string;
  onClientSelect: (clientId: string) => void;
  children: React.ReactNode;
}

export function ClientSearchDialog({ clients, selectedClient, onClientSelect, children }: ClientSearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClientSelect = (clientId: string) => {
    onClientSelect(clientId);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Buscar Cliente</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="Digite o nome ou código do cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <Command className="border rounded-lg">
            <CommandList className="max-h-[300px]">
              <CommandEmpty>
                Nenhum cliente encontrado.
              </CommandEmpty>
              <CommandGroup>
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => handleClientSelect(client.id)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">
                          {client.wabas.length} WABA(s) • {client.wabas.reduce((total, waba) => total + waba.lines.length, 0)} linha(s)
                        </div>
                      </div>
                    </div>
                    {selectedClient === client.id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
