export const BLOG_PROMPTS = {
  SYSTEM:
    "Your job is to work as a blog editor and copywriter.\n\nYou will receive a markdown text and create the following:\n- excerpt (which must be maximum of 256 characters)\n- title (best appealing short title for the blog)\n- read time (the estimated time for a normal reader to read)\n- suggestion of revised and formatted markdown from the given markdown text based on ton of conversation\n\ninput example: \n```\n{\ntext: '# AI in Games\n\nArtificial Intelligence (AI) plays a crucial role in modern video games. It powers non-player characters (NPCs), making them behave more realistically and adapt to players' actions. From enemies that learn tactics to allies that respond intelligently, AI enhances gameplay immersion.\n\nAdditionally, AI is used behind the scenes for procedural content generation, dynamic difficulty adjustment, and personalized player experiences. As AI technology advances, its impact on gaming will continue to grow, enabling even more engaging and responsive worlds.', \nton: 'technical'\n}\n```\n\noutput format should follow this json:\n```\n{\nexcerpt: string,\ntitle: string,\nread_time: string,\nformatted_suggestion\n}\n```",
  ASSISTANT:
    '{\n  "excerpt": "Desenvolvi uma solução para melhorar testes em GTA SA usando IPC com NamedPipes, facilitando comunicações entre processo e jogo, acelerando a engenharia reversa e automação com Elixir, sem precisar reinjetar DLLs continuamente.",\n  "title": "Inovando Engenharia Reversa em GTA SA com IPC e Elixir",\n  "read_time": 85000,\n  "formatted_suggestion": "# Otimizando Testes em GTA SA com IPC e Elixir\\n\\nNesta postagem, compartilho minha experiência de aprimorar o processo de engenharia reversa no GTA SA, criando uma comunicação eficiente entre o jogo e um script externo usando NamedPipes.\\n\\n## Desafios e Solução\\n\\nInicialmente, meus testes eram manuais, envolvendo repetidas injeções de DLLs. Para acelerar o ciclo, desenvolvi uma abordagem que evita reinjeções, usando uma comunicação contínua via NamedPipes, garantindo uma interação mais rápida e dinâmica.\\n\\n## Implementação no C++\\n\\nA biblioteca que criei possibilita comandos como teleporte e criação de veículos através de mensagens enviadas pela pipe. Aqui está um trecho do código que gerencia essa comunicação:\\n\\n```cpp\\nvoid HandleTeleport(std::istringstream& args) {\\n    Vector3 pos;\\n    if (args >> pos.x >> pos.y >> pos.z) {\\n        DWORD* playerPtr = GetPlayer();\\n        CPed player((uintptr_t)playerPtr);\\n        player.Teleport(pos, 0);\\n        printf(\\"Teleportado para: %f, %f, %f\\\\n\\", pos.x, pos.y, pos.z);\\n    } else {\\n        printf(\\"Input inválido para teleportar.\\n\\");\\n    }\\n}\\n\\n// Código omitido para brevidade...\\n\\n// Thread que escuta o pipe\\nvoid NamedPipeThread() {\\n    // setup do pipe...\\n    while (true) {\\n        HANDLE hPipe = CreateNamedPipeA(/* params */);\\n        // conexão e leitura...\\n        // ao receber mensagem, despacho de comando...\\n    }\\n}\\n```\\n\\n## Integração com Elixir\\n\\nNo lado do Elixir, um módulo gerencia a conexão persistente com o pipe, permitindo enviar comandos ao GTA SA em tempo real:\\n\\n```elixir\\ndefmodule GameConnector do\\n  @pipe_name \\"\\\\\\\\.\\\\pipe\\\\game_pipe\\"\\n\\n  def start_link() do\\n    Task.start_link(fn -> communication_loop() end)\\n  end\\n\\n  defp communication_loop() do\\n    with {:ok, file} <- File.open(@pipe_name, [:binary, :read, :write]) do\\n      try do\\n        loop(file)\\n      after\\n        File.close(file)\\n      end\\n    else\\n      {:error, err} -> IO.inspect(\\"Erro na conexão via pipe\\"), err\\n    end\\n  end\\n\\n  defp loop(file) do\\n    receive do\\n      {:send, message} ->\\n        IO.binwrite(file, message)\\n        loop(file)\\n    end\\n  end\\n\\n  def send_message(pid, message), do: send(pid, {:send, message})\\nend\\n```\\n\\n## Conclusão\\n\\nAo implementar essa arquitetura, aceleramos os testes, automações e aprimoramos a engenharia reversa na GTA SA sem interromper o fluxo do jogo. Essa abordagem pode ser adaptada para outros projetos que envolvam comunicação entre processos e automação.\\n\\n# Fim"\n}',
};

export const BLOG_OUTPUT_TEXT = {
  format: {
    type: 'json_schema',
    name: 'document_output',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        excerpt: {
          type: 'string',
          description: 'A short excerpt or summary of the document.',
        },
        title: {
          type: 'string',
          description: 'The title of the document.',
        },
        read_time: {
          type: 'number',
          description:
            'Estimated time required to read the document, in minutes.',
        },
        formatted_suggestion: {
          type: 'string',
          description: 'A formatted suggestion related to the document.',
        },
      },
      required: ['excerpt', 'title', 'read_time', 'formatted_suggestion'],
      additionalProperties: false,
    },
  },
};
