import m from 'mithril'
interface ILoading {
  isLoading: boolean,
  handleLoading: () => void
}
const Loading: ILoading = {
  isLoading: false,
  handleLoading: () => {
    Loading.isLoading = !Loading.isLoading;
    m.redraw()
  }
}
export default Loading