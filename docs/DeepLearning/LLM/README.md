# 大语言模型（LLM）
+ [交大的课程资料](https://github.com/Lordog/dive-into-llms) [昇腾的类似的课程与资料](https://www.hiascend.com/edu/growth/lm-development#classification-floor-1)
+ [动手学大模型应用开发](https://datawhalechina.github.io/llm-universe)：提供了LLM的API调用示例
+ [面向开发者的 LLM 入门教程 吴恩达大模型系列课程中文版](https://github.com/datawhalechina/llm-cookbook)
[大模型排名](https://lmarena.ai/leaderboard)
## 论文
+ 综述
  + [A Survey of Large Language Models](https://arxiv.org/abs/2303.18223) [大语言模型 中文版](https://llmbook-zh.github.io/)
+ Seq2Seq:
+ Transformer:
  + [Attention is all you needed](https://arxiv.org/abs/1706.03762) [youtube 超级详细讲解](https://youtu.be/ugWDIIOHtPA?si=wsJaXwAypp-T29NU) [知乎](https://zhuanlan.zhihu.com/p/338817680)
  + 如果没有位置向量使得 输入元素X的交换操作P后为PX，产生的输出为P`softmax(QK)V`，[仅仅使得输出元素交换位置](https://www.reddit.com/r/deeplearning/comments/1ew4dv4/transformers_without_positional_encodings/)。也有论文测试了没有位置向量的情况，[看起来表现差不多](https://arxiv.org/abs/2203.16634)，引用率几乎为0，说明LLM主流认为位置向量仍然是有存在的必要。
  + Decoder在第一个Multi-head attentaion中计算`softmax(MQK)`，其中`M`为mask。
+ BERT:
+ RAG: 
  + 综述：[Towards Agentic RAG with Deep Reasoning: ASurvey of RAG-Reasoning Systems in LLMs](https://arxiv.org/pdf/2507.09477)
  + [开发实战](https://datawhalechina.github.io/all-in-rag/#/)

## 大语言模型 中文版
+ 大语言模型的演化：统计学习语言模型（n-gram）、神经网络语言模型（word2vec使用无标注文本学习词嵌入表示）、预训练语言模型（ELMo、BERT、GPT-1 预训练-微调模式）、大语言模型（Scaling Law等） 
  + Scaling Law 
  + Emergence 涌现：看起来是唯象理论，没有严谨的证据。In context learning, Instruction following, Step-by-step reasoning。
+ 预训练
  + 数据预处理：质量过滤、敏感内容过滤、数据去重
  + 分词（Tokenization）：BPE分词、WordPiece分词、Unigram分词
  + 数据调度：先在小模型上tune数据类型配比
  + 模型架构：
    + Tranformer结构
    + 归一化方法、归一化模块位置、激活函数、位置编码
    + 注意力机制：完整注意力机制、稀疏注意力机制、多查询注意力（MQA）、分组查询注意力（GQA）
    + 混合专家模型
  + 主流架构：编码器架构、解码器架构（因果解码器、前缀解码器 如`GLM-130B`）、编码器-解码器架构
  + 模型预训练：
    + 预训练任务：语言建模（LanguageModeling,LM）、去噪自编码（Denoising Autoencoding, DAE）以及混合去噪器（Mixture-of-Denoisers, MoD）
    + 优化参数
+ 指令微调: 使用自然语言形式的数据对预训练后的大语言模型进行参数微调
  + 指令数据的构建: 现有的NLP任务（如翻译）+任务描述、日常对话数据集、合成数据
  + 训练策略：优化器设置（AdamW或Adafactor）、稳定训练技巧（权重衰减和梯度裁剪）和训练技术（3D并行、ZeRO和混合精度训练）都与预训练保持阶段一致
  + 参数高效的模型微调：低秩适配（Low-RankAdaptation,LoRA）微调、适配器微调、前缀微调、提示微调
+ 模型对齐
  + RLHF：依赖人工标注数据训练奖励模型，PPO算法
  + 非强化学习的方法：DPO算法
+ 解码与部署
  + 解码：在自回归架构中，模型针对输入内容（即提示文本）逐个单词生成输出内容的文本
  + 部署：模型量化来减少大模型的显存占用，从而使得能够在资源有限的环境下使用大模型
    + 模型压缩：蒸馏
+ 提示学习：因为大语言模型的微调代价较高，基于自然语言的提示方法已经成为了使用大语言模型解决下游任务的主要途径。（注意和前面提示微调的区别）
  + 上下文学习
  + 思维链提示：
+ 规划与智能体
+ 评测与应用

## 动手学大模型应用开发
+ 免费的API有：讯飞星火、智谱GLM。另外我发现阿里通义千问有免费的1,000,000的token额度，此外设置使用完停止参考[这里](https://help.aliyun.com/zh/model-studio/new-free-quota)。
+ 智谱API调用：[官方文档 curl调用](https://docs.bigmodel.cn/cn/guide/models/text/glm-4.5) [官方文档python调用](https://github.com/zai-org/z-ai-sdk-python?tab=readme-ov-file#-quick-start)竟然海外和国内用两个不同名称的sdk zai和zhipuai。
  + [示例需要加入token文件]()
+ 搭建知识库：词向量，调用API产生词向量embeddings
+ 构建RAG应用：LCEL中要求所有的组成元素都是Runnable类型，
+ 我把代码整理到了[仓库](https://github.com/greatofdream/LLM_RAG), langchain的[官方文档](https://python.langchain.ac.cn/docs/tutorials/)也包含了有关RAG应用的教程。
  + 结合仓库及langchain的官方文档，我升级了LCEL对`ConversationRetrievalChain`的写法
  + streamlit会[渲染docstring](https://github.com/streamlit/streamlit/issues/533)，所以不能用3个单引号做注释，最好用`#`，或者将这个注释块当作字符串赋值给`comment`变量。
+ 课程最后提供了一个知识库项目，看了代码发现里面用的较旧的写法
  + `RetrievalQA`[升级为`LCEL`](https://python.langchain.ac.cn/docs/versions/migrating_chains/retrieval_qa/)
  + `ConversationRetrievalChain`[升级为`LCEL`](https://python.langchain.ac.cn/docs/versions/migrating_chains/conversation_retrieval_chain/)

## 面向开发者的 LLM 入门教程
相关课程可以在[网站主页](https://learn.deeplearning.ai/)检索得到。
+ 提示工程：吴恩达课程《ChatGPT Prompt Engineering for Developers》
  + 清晰具体的指令、给模型思考空间、局限性（幻觉hallucination）
+ 问答系统：吴恩达课程《Building Systems with the ChatGPT API》
  + 语言模型、tokens；其中文档提到将函数封装到`tool`这个包里，实际上并没有提供这个包，应该只是为了叙述简便。
  + 评估输入：分类
  + 检查输入：监督
  + 处理输入-思维链推理（Chain of Thought Reasoning）：
  + Prompt 链：简单的函数调用查询json文件，类似插件；也可以用embedding编码做RAG。
    + 用到了openai的`assistant` role提供经函数增强的助手产生的上下文信息，相关文档[model-spec](https://model-spec.openai.com/2025-02-12.html)[text generation](https://platform.openai.com/docs/guides/text#message-roles-and-instruction-following)
  + 检查输出
  + 端到端系统搭建：
  + 评估
+ LangChain 开发应用程序：《LangChain for LLM Application Development》
  + 模型调用和输出解析
  + 对话存储：`langchain`支持`ConversationBufferMemory`,`ConversationBufferWindowMemory`可以约束对话窗口大小,`ConversationTokenBufferMemory`约束token数量,`ConversationSummaryBufferMemory`使用 LLM 对到目前为止历史对话自动总结摘要，并将其保存下来
  + 模型链：顺序链
  +  基于文档的问答：首先，使用文本嵌入(Embeddings)算法对文档进行向量化，使语义相似的文本片段具有接近的向量表示。其次，将向量化的文档切分为小块，存入向量数据库，这个流程正是创建索引(index)的过程
  + 评估：`from langchain.evaluation.qa import QAGenerateChain`生成测例, `from langchain.evaluation.qa import QAEvalChain`评估测例
  + 代理：作为语言模型的外部模块，可提供计算、逻辑、检索等功能的支持，使语言模型获得异常强大的推理和获取信息的超能力
    + 测试了agent在智谱AI表现，相当糟糕，无法按照langchain中默认的promt输出预期结果
+ LangChain 访问个人数据：《LangChain Chat with Your Data》
  + 文档加载
  + 文档分割
  + 向量数据库
  + 检索
  + 问答
  + 聊天

